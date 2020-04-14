Plotly.d3.csv('https://www.margotbits.com/gacovid19/csv/ga-stats-consolidated.csv', function(err, rows){
  function unpack(rows, key) {
      return rows.map(function(row) { return row[key]; });
  }

  var date = unpack(rows,'date')
      cases = unpack(rows, 'cases'),
      hospitalized = unpack(rows, 'hospitalized'),
      deaths = unpack(rows, 'deaths')
  var diffCases = [0];
  var diffDeaths = [0];

 for ( var i = 0 ; i < cases.length; i++) {
   if (i<cases.length) {
    diffCases.push(cases[i+1]-cases[i]);
    diffDeaths.push(deaths[i+1]-deaths[i]);
  }
 }

  var trace1 = {
    x: date,
    y: diffCases,
    name: 'Change in Confirmed Cases',
    marker: {color: 'rgb(55, 83, 109)'},
    type: 'bar'
  };

  var trace2 = {
    x: date,
    y: diffDeaths,
    name: 'Change in Confirmed Deaths',
    marker: {color: 'rgb(26, 118, 255)'},
    type: 'bar'
  };

  var data = [trace1, trace2];


  var layout = {
    plot_bgcolor: 'transparent',
    paper_bgcolor:'transparent',
    title: 'Daily Change in Confirmed Cases & Deaths',
    font: {
      color: 'rgba(0,0,0,0.75)',
      family: 'Lato',
      size: 16,

    },
    xaxis: {
      tickfont: {
        size: 14,
        color: 'rgb(10, 10, 10)'
      }
    },
    yaxis: {
      showgrid: false,
      title: 'Daily Change',
      titlefont: {
        size: 16,
        color: 'rgb(10, 10, 10)'
      },
      tickfont: {
        size: 14,
        color: 'rgb(10, 10, 10)'
      }
    },
    legend: {
      x: 0,
      y: 1.0,
      bgcolor: 'rgba(255, 255, 255, 0)',
      bordercolor: 'rgba(255, 255, 255, 0)',
      color: 'rgb(10, 10, 10)'
    },
    barmode: 'group',
    bargap: 0.15,
    bargroupgap: 0.1
  };

  Plotly.newPlot('change', data, layout);
});
