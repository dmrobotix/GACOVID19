"use strict"

async function downloadGDPH() {
  const url = "https://d20s4vd27d0hk0.cloudfront.net/?initialWidth=436&childId=covid19dashdph&parentTitle=COVID-19%20Daily%20Status%20Report%20%7C%20Georgia%20Department%20of%20Public%20Health&parentUrl=https%3A%2F%2Fdph.georgia.gov%2Fcovid-19-daily-status-report%3Ffbclid%3DIwAR0vLO45zcpjlPKaQR3sc-MyZtqsnE4TfSDNkCUb8X6xDkgxNJyOKaEkhPE"
  const today = new Date()
  // date format: YYYYMMD-HHMMSS
  const date = today.getFullYear()+''+(today.getMonth()+1)+''+today.getDate()+'-'+today.getHours()+''+today.getMinutes()+''+today.getSeconds()
  const filename = "gdph-raw-data-" + date + ".html"

  console.log('Downloading HTML from Georgia Department of Health')
}

// summary of confimed cases
document.querySelectorAll('#summary > table')[0].childNodes[1].querySelectorAll('tr')
document.querySelectorAll('#summary > table')[0].childNodes[1].querySelectorAll('tr')[0].innerHTML // header
document.querySelectorAll('#summary > table')[0].childNodes[1].querySelectorAll('tr')[1].cells[0].innerText // type
document.querySelectorAll('#summary > table')[0].childNodes[1].querySelectorAll('tr')[1].cells[1].innerText // amount

// county cases
document.querySelectorAll('#summary > table')[1].childNodes[1].querySelectorAll('tr')
document.querySelectorAll('#summary > table')[1].childNodes[1].querySelectorAll('tr')[0].innerHTML // header
document.querySelectorAll('#summary > table')[1].childNodes[1].querySelectorAll('tr')[1].cells[0].innerText // County
document.querySelectorAll('#summary > table')[1].childNodes[1].querySelectorAll('tr')[1].cells[1].innerText // Confirmed
document.querySelectorAll('#summary > table')[1].childNodes[1].querySelectorAll('tr')[1].cells[2].innerText // deaths


// testing
document.querySelectorAll('#testing > table')[0].childNodes[1].querySelectorAll('tr')
document.querySelectorAll('#testing > table')[0].childNodes[1].querySelectorAll('tr')[0].innerHTML // header
document.querySelectorAll('#testing > table')[0].childNodes[1].querySelectorAll('tr')[1].cells[0].innerText // type
document.querySelectorAll('#testing > table')[0].childNodes[1].querySelectorAll('tr')[1].cells[1].innerText // positive
document.querySelectorAll('#testing > table')[0].childNodes[1].querySelectorAll('tr')[1].cells[2].innerText // total
// death stats
document.querySelectorAll('#deaths > table')[0].childNodes[1].querySelectorAll('tr')
document.querySelectorAll('#deaths > table')[0].childNodes[1].querySelectorAll('tr')[0].innerHTML // header
document.querySelectorAll('#deaths > table')[0].childNodes[1].querySelectorAll('tr')[1].cells[0].innerText // age
document.querySelectorAll('#deaths > table')[0].childNodes[1].querySelectorAll('tr')[1].cells[1].innerText // sex
document.querySelectorAll('#deaths > table')[0].childNodes[1].querySelectorAll('tr')[1].cells[2].innerText // county
document.querySelectorAll('#deaths > table')[0].childNodes[1].querySelectorAll('tr')[1].cells[3].innerText // underlying
