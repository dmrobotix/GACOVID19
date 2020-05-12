"use strict"
const rp = require('request-promise-native')
const fs = require('fs')
const cheerio = require('cheerio')

async function downloadGDPH() {
  const url = "https://d20s4vd27d0hk0.cloudfront.net/?initialWidth=436&childId=covid19dashdph&parentTitle=COVID-19%20Daily%20Status%20Report%20%7C%20Georgia%20Department%20of%20Public%20Health&parentUrl=https%3A%2F%2Fdph.georgia.gov%2Fcovid-19-daily-status-report%3Ffbclid%3DIwAR0vLO45zcpjlPKaQR3sc-MyZtqsnE4TfSDNkCUb8X6xDkgxNJyOKaEkhPE"

  const today = new Date()
  // date format: YYYYMMD-HHMMSS
  const date = today.getFullYear()+''+(today.getMonth()+1)+''+today.getDate()+'-'+today.getHours()+''+today.getMinutes()+''+today.getSeconds()
  const dateForFile = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear()+' '+today.getHours()+':'+today.getMinutes()

  // save date accessed
  const datefilename = "js/dateaccessed.js"
  const dateScript = "const str = '"+dateForFile+"'; document.getElementById('updated-time').innerHTML = str;"
  try {
    await fs.writeFile(datefilename, dateScript)
  } catch (err) {
    console.log(err)
  }

  const filename = "raw/gdph-raw-data-" + date + ".html"

  console.log('Downloading HTML from Georgia Department of Health')
  const results = await rp({uri: url})

  // save local version
  try {
    await fs.writeFile(filename, results)
  } catch (err) {
    console.log(err)
  }

  return results
}

async function getGeocoordinates() {
  let geoData = {
    county: [],
    lat: [],
    lon: [],
    pop: []
  }
  try {
    const data = fs.readFileSync('csv/county-geocoordinates.csv','UTF-8')
    const lines = data.split(/\r?\n/)

    lines.forEach((line) => {
      const row = line.split(',')
      let county = geoData.county
      let lat = geoData.lat
      let lon = geoData.lon
      let pop = geoData.pop
      county.push(row[0])
      lat.push(row[1])
      lon.push(row[2])
      pop.push(row[3])
      geoData.county = county
      geoData.lat = lat
      geoData.lon = lon
      geoData.pop = pop
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
    lon: [],
    pop: []
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
              summaryTable.total = $(this).siblings().text().split(' ')[0]
            } else if ($(this).text() == "Hospitalized") {
              console.log($(this).siblings().text().split(' ')[0])
              summaryTable.hospitalized = $(this).siblings().text().split(' ')[0]
            } else if ($(this).text() == "Deaths") {
              console.log($(this).siblings().text().split(' ')[0])
              summaryTable.deaths = $(this).siblings().text().split(' ')[0]
            }
          })
        }
      })
    }

    // county cases
    var unknown = 0
    if (i == 1) {
      $(this).find('tr').each(function(i,e) {
        if (i !== 0) {
          $(this).find('td').each(function(i,e) {
            if (i == 0) {
              let county = countyTable.county
              let lat = countyTable.lat
              let lon = countyTable.lon
              let pop = countyTable.pop

              county.push($(this).text())
              countyTable.county = county

              const found = geocoords.county.findIndex(element => element == $(this).text())
              lat.push(geocoords.lat[found])
              lon.push(geocoords.lon[found])
              pop.push(geocoords.pop[found])
              countyTable.lat = lat
              countyTable.lon = lon
              countyTable.pop = pop

              if ($(this).text() == "Unknown") {
                unknown = 1;
              }

            } else if (i == 1) {
              let cases = countyTable.cases
              cases.push($(this).text())
              countyTable.cases = cases
              if (unknown == 1) {
                console.log("Unknown Cases: " + $(this).text())
              }
            } else if (i == 2) {
              let deaths = countyTable.deaths
              deaths.push($(this).text())
              countyTable.deaths = deaths
              if (unknown == 1) {
                console.log("Unknown Deaths: " + $(this).text())
                unknown = 0
              }
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
  const consolidatedLine = summaryTable.total+","+summaryTable.hospitalized+","+summaryTable.deaths
  const testingLine = "\n"+testingTable.commercial+","+testingTable.gphl+","+testingTable.date

  const today = new Date()
  const fileDate = (today.getMonth()+1)+today.getDate()+today.getFullYear()+'-'+today.getHours()+today.getMinutes()+today.getSeconds()

  const testingFilename = "csv/gatests.csv"
  const deathsStatsDateFilename = "csv/ga-deaths-stats"+fileDate+".csv"
  const deathsStatsFilename = "csv/ga-deaths-stats.csv"
  const summaryFilename = "csv/gasummary.csv"
  const countyFilename = "csv/gacounties.csv"
  const countyDateFilename = "csv/gacounties-"+fileDate+".csv"
  const consolidatedFilename = "csv/ga-stats-consolidated.csv"

  const csvCountyTable = CSV(countyTable)
  const csvDeathStatsTable = CSV(deathStatsTable)

  try {
    await fs.writeFile(countyDateFilename, csvCountyTable)
  } catch (err) {
    console.log(err)
  }

  try {
    await fs.writeFile(countyFilename, csvCountyTable)
  } catch (err) {
    console.log(err)
  }

  try {
    await fs.writeFile(deathsStatsDateFilename, csvDeathStatsTable)
  } catch (err) {
    console.log(err)
  }

  try {
    await fs.writeFile(deathsStatsFilename, csvDeathStatsTable)
  } catch (err) {
    console.log(err)
  }

  try {
    await fs.appendFile(summaryFilename, summaryLine)
  } catch (err) {
    console.log(err)
  }

  try {
    await fs.appendFile(testingFilename, testingLine)
  } catch (err) {
    console.log(err)
  }

  try {
    const data = fs.readFileSync(consolidatedFilename,'UTF-8')
    const lines = data.split(/\r?\n/)
    const today = new Date()
    const dateOnly = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear()
    var output = ''
    lines.forEach((line) => {
      const row = line.split(',')
      if (row.length > 1 && row[0] != dateOnly) {
        output += row+"\n"
      }
    })
    output += dateOnly+","+consolidatedLine+"\n"
  } catch (err) {
    console.log(err)
  }

  try {
    await fs.writeFile(consolidatedFilename, output)
  } catch (err) {
    console.log(err)
  }

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
  loadDOM(results,geocoords)
  console.log('Done!')
}

main()
