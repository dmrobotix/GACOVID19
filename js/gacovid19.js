"use strict"
var xData = [
  ['3/1/2020', '3/2/2020', '3/5/2020', '3/9/2020', '3/11/2020', '3/13/2020', '3/14/2020', '3/16/2020', '3/17/2020', '3/18/2020']
];

var yData = [
  [0, 2, 2, 17, 31, 42, 64, 121, 146, 197]
];

var colors = ['rgba(67,67,67,1)'];

var lineSize = [2, 2, 4, 2];

var labels = ['Confirmed'];

var data = [];

for ( var i = 0 ; i < xData.length ; i++ ) {
  var result = {
    x: xData[i],
    y: yData[i],
    type: 'scatter',
    mode: 'lines',
    line: {
      color: colors[i],
      width: lineSize[i]
    }
  };
  var result2 = {
    x: [xData[i][0], xData[i][11]],
    y: [yData[i][0], yData[i][11]],
    type: 'scatter',
    mode: 'markers',
    marker: {
      color: colors[i],
      size: 12
    }
  };
  data.push(result, result2);
}

var layout = {
  showlegend: false,
  plot_bgcolor: '#ccc',
  paper_bgcolor:'#ccc',
  height: 600,
  width: 600,
  xaxis: {
    showline: true,
    showgrid: false,
    showticklabels: true,
    linecolor: 'rgb(204,204,204)',
    linewidth: 2,
    autotick: false,
    ticks: 'outside',
    tickcolor: 'rgb(204,204,204)',
    tickwidth: 2,
    ticklen: 5,
    tickfont: {
      family: 'Lato',
      size: 12,
      color: 'rgb(82, 82, 82)'
    }
  },
  yaxis: {
    showgrid: false,
    zeroline: false,
    showline: false,
    showticklabels: false
  },
  autosize: false,
  margin: {
    autoexpand: false,
    l: 100,
    r: 20,
    t: 100
  },
  annotations: [
    {
      xref: 'paper',
      yref: 'paper',
      x: 0.0,
      y: 1.05,
      xanchor: 'left',
      yanchor: 'bottom',
      text: 'Georgia COVID-19 Confirmed Cases',
      font:{
        family: 'Lato',
        size: 30,
        color: 'rgb(37,37,37)'
      },
      showarrow: false
    }
  ]
};

for( var i = 0 ; i < xData.length ; i++ ) {
  var result = {
    xref: 'paper',
    x: 0.05,
    y: yData[i][0],
    xanchor: 'right',
    yanchor: 'middle',
    text: labels[i],
    showarrow: false,
    font: {
      family: 'Arial',
      size: 16,
      color: 'black'
    }
  };
  var result2 = {
    xref: 'paper',
    x: 0.95,
    y: yData[i][11],
    xanchor: 'left',
    yanchor: 'middle',
    text: yData[i][11] +'%',
    font: {
      family: 'Arial',
      size: 16,
      color: 'black'
    },
    showarrow: false
  };

  layout.annotations.push(result);
}

Plotly.newPlot('myDiv', data, layout);
