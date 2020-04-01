Plotly.d3.csv('https://www.margotbits.com/gacovid19/csv/gatests.csv', function(err, rows){
  function unpack(rows, key) {
      return rows.map(function(row) { return row[key]; });
  }

  var commercial = unpack(rows, 'commercial lab'),
      commercialTotal = unpack(rows, 'commercial total'),
      gphl = unpack(rows, 'GPHL lab'),
      gphlTotal = unpack(rows, 'GPHL total'),
      date = unpack(rows,'date')

  /*var trace1 = {
    x: ['3/21/20 12:09','3/21/20 12:10','3/21/20 12:20','3/21/20 12:30','3/21/20 12:40','3/21/20 12:50','3/22/20 12:00','3/23/20 12:00','3/28/20 12:00','3/29/20 12:00','3/30/20 12:00','3/31/20 12:00','3/21/20 14:00','3/21/20 18:00','3/21/20 19:00', '3/22/20 12:00'],
    y: [219, 146, 112, 127, 124, 180, 236, 207, 236, 263, 350, 430, 474, 526, 488, 537, 500, 439],
    name: 'Commercial Testing',
    marker: {color: 'rgb(55, 83, 109)'},
    type: 'bar'
  };

  var trace2 = {
    x: ['3/21/20 12:09','3/21/20 12:10','3/21/20 12:20','3/21/20 12:30','3/21/20 12:40','3/21/20 12:50','3/22/20 12:00','3/23/20 12:00','3/28/20 12:00','3/29/20 12:00','3/30/20 12:00','3/31/20 12:00','3/21/20 14:00','3/21/20 18:00','3/21/20 19:00', '3/22/20 12:00'],
    y: [16, 13, 10, 11, 28, 37, 43, 55, 56, 88, 105, 156, 270, 299, 340, 403, 549, 499],
    name: 'Georgia Public Health Laboratory',
    marker: {color: 'rgb(26, 118, 255)'},
    type: 'bar'
  };*/

  var trace1 = {
    x: date,
    y: commercial,
    name: 'Commercial Testing - Positive',
    marker: {color: 'rgb(55, 83, 109)'},
    type: 'bar'
  };

  var trace2 = {
    x: date,
    y: gphl,
    name: 'Georgia Public Health Laboratory - Positive',
    marker: {color: 'rgb(26, 118, 255)'},
    type: 'bar'
  };

  var trace3 = {
    x: date,
    y: commercialTotal,
    name: 'Commercial Testing - Total',
    marker: {color: 'rgba(219, 64, 82, 0.7)'},
    type: 'bar'
  };

  var trace4 = {
    x: date,
    y: gphlTotal,
    name: 'Georgia Public Health Laboratory - Total',
    marker: {color: 'rgb(204,204,204)'},
    type: 'bar'
  };

  var data = [trace1, trace2, trace3, trace4];


  var layout = {
    plot_bgcolor: 'transparent',
    paper_bgcolor:'transparent',
    title: 'Georgia COVID-19 Testing',
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
      title: 'Number of Tests',
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

  Plotly.newPlot('testing', data, layout);
});
