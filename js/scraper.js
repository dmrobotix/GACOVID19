"use strict"
const rp = require('request-promise-native')
//const fsPromises = require('fs').promises
const fs = require('fs')

const cheerio = require('cheerio')

async function downloadGDPH() {
  const url = "https://d20s4vd27d0hk0.cloudfront.net/?initialWidth=436&childId=covid19dashdph&parentTitle=COVID-19%20Daily%20Status%20Report%20%7C%20Georgia%20Department%20of%20Public%20Health&parentUrl=https%3A%2F%2Fdph.georgia.gov%2Fcovid-19-daily-status-report%3Ffbclid%3DIwAR0vLO45zcpjlPKaQR3sc-MyZtqsnE4TfSDNkCUb8X6xDkgxNJyOKaEkhPE"
  const today = new Date()
  // date format: YYYYMMD-HHMMSS
  const date = today.getFullYear()+''+(today.getMonth()+1)+''+today.getDate()+'-'+today.getHours()+''+today.getMinutes()+''+today.getSeconds()
  const filename = "raw/gdph-raw-data-" + date + ".html"

  console.log('Downloading HTML from Georgia Department of Health')
  const results = await rp({uri: url})

  // save local version
  await fs.writeFile(filename, results)

  return results
}

async function getGeocoordinates() {
  let geoData = {
    county: [],
    lat: [],
    lon: []
  }
  try {
    const data = fs.readFileSync('csv/county-geocoordinates.csv','UTF-8')
    const lines = data.split(/\r?\n/)

    lines.forEach((line) => {
      const row = line.split(',')
      let county = geoData.county
      let lat = geoData.lat
      let lon = geoData.lon
      county.push(row[0])
      lat.push(row[1])
      lon.push(row[2])
      geoData.county = county
      geoData.lat = lat
      geoData.lon = lon
    })
  } catch (err) {
    console.log(err)
  }

  return geoData
}

async function loadDOM(results, geocoords) {
  //const el = document.createElement('html')
  //let domparser = new DOMParser()
  //const htmlDoc = parser.parseFromString(results,'text/html')
  const $ = cheerio.load(results)

  var summaryTable = {
    total: '',
    hospitalized: '',
    deaths: '',
    date: ''
  }
  var countyTable = {
    county: [],
    cases: [],
    deaths: [],
    lat: [],
    lon: []
  }

  var testingTable = {
    commercial: '',
    gphl: '',
    date: ''
  }

  var deathStatsTable = {
    age: [],
    sex: [],
    county: [],
    underlying: []
  }

  // death statistics
  const deathStats = $('#deaths > table').each(function(i,e) {
    $(this).find('tr').each(function(i,e) {
      if (i !== 0) {
        $(this).find('td').each(function(i,e) {
          if (i == 0) {
            let age = deathStatsTable.age
            age.push($(this).text())
            deathStatsTable.age = age
          } else if (i == 1) {
            let sex = deathStatsTable.sex
            sex.push($(this).text())
            deathStatsTable.sex = sex
          } else if (i == 2) {
            let county = deathStatsTable.county
            county.push($(this).text())
            deathStatsTable.county = county
          } else if (i == 3) {
            let underlying = deathStatsTable.underlying
            underlying.push($(this).text())
            deathStatsTable.underlying = underlying
          }
        })
      }
    })
  })

  // testing commercial and public
  const testing = $('#testing > table').each(function(i,e) {
    $(this).find('tr').each(function(i,e) {
      if (i !== 0) {
        $(this).find('td').each(function(i,e) {
          if ($(this).text() == "Commercial Lab") {
            testingTable.commercial = $(this).siblings().text().replace(' ',',')
          } else if ($(this).text() == "Gphl") {
            testingTable.gphl = $(this).siblings().text().replace(' ',',')
          }
        })
      }
    })
    const today = new Date()
    const date = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear()+' '+today.getHours()+':'+today.getMinutes()+':'+today.getSeconds()
    testingTable.date = date
  })

  // summary of confirmed cases and cases by county
  const summary = $('#summary > table').each(function(i,e) {
    // summary table
    if (i == 0) {
      $(this).find('tr').each(function(i,e) {
        if (i !== 0) {
        // i == 1 total
        // i == 2 Hospitalized
        // i == 3 deaths
          $(this).find('td').each(function(i,e) {
            if ($(this).text() == "Total") {
              console.log($(this).siblings().text())
              summaryTable.total = $(this).siblings().text()
            } else if ($(this).text() == "Hospitalized") {
              console.log($(this).siblings().text())
              summaryTable.hospitalized = $(this).siblings().text()
            } else if ($(this).text() == "Deaths") {
              console.log($(this).siblings().text())
              summaryTable.deaths = $(this).siblings().text()
            }
          })
        }
      })
    }

    // county cases
    if (i == 1) {
      $(this).find('tr').each(function(i,e) {
        if (i !== 0) {
          $(this).find('td').each(function(i,e) {
            if (i == 0) {
              let county = countyTable.county
              let lat = countyTable.lat
              let lon = countyTable.lon

              county.push($(this).text())
              countyTable.county = county

              const found = geocoords.county.findIndex(element => element == $(this).text())
              lat.push(geocoords.lat[found])
              lon.push(geocoords.lon[found])
              countyTable.lat = lat
              countyTable.lon = lon

            } else if (i == 1) {
              let cases = countyTable.cases
              cases.push($(this).text())
              countyTable.cases = cases
            } else if (i == 2) {
              let deaths = countyTable.deaths
              deaths.push($(this).text())
              countyTable.deaths = deaths
            }
          })
        }
      })
    }
    const today = new Date()
    const date = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear()+' '+today.getHours()+':'+today.getMinutes()+':'+today.getSeconds()
    summaryTable.date = date
  })

  // write files
  const summaryLine = "\n"+summaryTable.total+","+summaryTable.hospitalized+","+summaryTable.deaths+","+summaryTable.date
  const testingLine = "\n"+testingTable.commercial+","+testingTable.gphl+","+testingTable.date

  const today = new Date()
  const fileDate = today.getFullYear()+''+(today.getMonth()+1)+''+today.getDate()+'-'+today.getHours()+''+today.getMinutes()+''+today.getSeconds()

  const testingFilename = "csv/gatests.csv"
  const deathsStatsDateFilename = "csv/ga-deaths-stats"+fileDate+".csv"
  const deathsStatsFilename = "csv/ga-deaths-stats.csv"
  const summaryFilename = "csv/gasummary.csv"
  const countyFilename = "csv/gacounties.csv"
  const countyDateFilename = "csv/gacounties-"+fileDate+".csv"

  const csvCountyTable = CSV(countyTable)
  const csvDeathStatsTable = CSV(deathStatsTable)

  await fs.writeFile(countyDateFilename, csvCountyTable)
  await fs.writeFile(countyFilename, csvCountyTable)
  await fs.writeFile(deathsStatsDateFilename, csvDeathStatsTable)
  await fs.writeFile(deathsStatsFilename, csvDeathStatsTable)
  await fs.appendFile(summaryFilename, summaryLine)
  await fs.appendFile(testingFilename, testingLine)
}

function CSV(object) {
    // Use first element to choose the keys and the order
    const keys = Object.keys(object)
    const keyLen = keys.length
    const arrayLen = object[keys[0]].length

    // Build header
    let result = keys.join(",") + "\n"

    for(var i=0; i<arrayLen; i++) {
      let row = []
      for(var k=0; k<keyLen; k++) {
        row[k] = object[keys[k]][i]
      }
      result += row.join(",") + "\n"
    }

    return result
}

async function main() {
  console.log("Starting...")
  let results = await downloadGDPH()
  let geocoords = await getGeocoordinates()
  //console.log(geocoordinates)
  loadDOM(results,geocoords)
  console.log('Done!')
}

main()
