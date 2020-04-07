"use strict"
Plotly.d3.csv('https://www.margotbits.com/gacovid19/csv/ga-stats-consolidated.csv', function(err, rows){
  function unpack(rows, key) {
      return rows.map(function(row) { return row[key]; });
  }

  var colors = ['rgba(0,0,0,1)', 'rgba(0,191,255,1)','rgba(134, 33, 255, 1)'];

  var lineSize = [2, 2, 4, 2];

  var labels = ['Confirmed'];

  var names = ['Cases', 'Deaths','Hospitalized'];

  var date = unpack(rows,'date')
      cases = unpack(rows, 'cases'),
      hospitalized = unpack(rows, 'hospitalized'),
      deaths = unpack(rows, 'deaths')

  document.getElementById('cases').innerHTML = cases[cases.length-1];
  document.getElementById('deaths').innerHTML = deaths[deaths.length-1];
  document.getElementById('hospitalized').innerHTML = hospitalized[hospitalized.length-1];
  /*document.getElementById('unknown-cases').innerHTML = 309;
  document.getElementById('unknown-deaths').innerHTML = 5;
  document.getElementById('unknown-cases-percent').innerHTML = 97.5;
  document.getElementById('unknown-deaths-percent').innerHTML = 41;*/

  var trace1 = {
    x: date,
    y: cases,
    type: 'scatter',
    mode: 'lines',
    name: names[0],
    line: {
      color: colors[0],
      width: lineSize[0]
    }
  };

  var trace2 = {
    x: date,
    y: hospitalized,
    type: 'scatter',
    mode: 'lines',
    name: names[2],
    line: {
      color: colors[2],
      width: lineSize[2]
    }
  };

  var trace3 = {
    x: date,
    y: deaths,
    xaxis: 'x2',
    yaxis: 'y2',
    type: 'scatter',
    mode: 'lines',
    name: names[1],
    line: {
      color: colors[1],
      width: lineSize[1]
    }
  };

  var data = [trace1, trace2, trace3];

  var layout = {
    yaxis2: {
      domain: [0.6,0.95],
      anchor: 'x2',
      showgrid: false,
      tickfont: {
        family: 'Lato',
        size: 10,
        color: 'rgba(0,0,0,0.6)'
      }
    },
    xaxis2: {
      domain: [0.1,0.3],
      anchor: 'y2',
      showgrid: false,
      tickfont: {
        family: 'Lato',
        size: 10,
        color: 'rgba(0,0,0,0.6)'
      }
    },
    showlegend: true,
    plot_bgcolor: 'transparent',
    paper_bgcolor:'transparent',
    title: 'Georgia Confirmed Cases',
    font: {
      color: 'rgba(0,0,0,0.75)',
      family: 'Lato',
      size: 16,

    },
    xaxis: {
      showline: true,
      showgrid: false,
      showticklabels: true,
      linecolor: 'rgba(0,0,0,0.6)',
      linewidth: 2,
      autotick: false,
      automargin: true,
      ticks: 'outside',
      tickcolor: 'rgba(0,0,0,0.6)',
      tickwidth: 2,
      ticklen: 5,
      tickfont: {
        family: 'Lato',
        size: 10,
        color: 'rgba(0,0,0,0.6)'
      }
    },
    yaxis: {
      title: 'Number of Confirmed',
      tickfont: {
        family: 'Lato',
        size: 10,
        color: 'rgba(0,0,0,0.6)'
      },
      showgrid: false,
      zeroline: false,
      showline: false,
      showticklabels: true
    }
  };


  var config = {responsive: true}

  Plotly.newPlot('timeline', data, layout,config);
});
