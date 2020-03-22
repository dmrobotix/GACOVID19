"use strict"
var xData = [
  [
    '3/1/20',
    '3/2/20',
    '3/5/20',
    '3/9/20',
    '3/11/20',
    '3/12/20',
    '3/13/20',
    '3/14/20',
    '3/16/20',
    '3/17/20',
    '3/18/20',
    '3/19/20',
    '3/20/20',
    '3/21/20'
],
[
  '3/1/20',
  '3/2/20',
  '3/5/20',
  '3/9/20',
  '3/11/20',
  '3/12/20',
  '3/18/20',
  '3/19/20',
  '3/20/20',
  '3/21/20'
]
];

var yData = [
  [
    0,
    2,
    2,
    17,
    31,
    42,
    42,
    64,
    121,
    146,
    197,
    287,
    485,
    555
  ],
  [
    0,
    0,
    0,
    0,
    0,
    1,
    4,
    10,
    14,
    20
  ]
];

var colors = ['rgba(67,67,67,1)', 'rgba(115,115,115,1)'];

var lineSize = [2, 2, 4, 2];

var labels = ['Confirmed'];

var data = [];

var names = ['Cases', 'Deaths'];

for ( var i = 0 ; i < xData.length ; i++ ) {
  var result = {
    x: xData[i],
    y: yData[i],
    type: 'scatter',
    mode: 'lines',
    name: names[i],
    line: {
      color: colors[i],
      width: lineSize[i]
    }
  };
  var result2 = {
    x: [xData[i][0]],
    y: [yData[i][0]],
    type: 'scatter',
    mode: 'markers',
    name:'',
    marker: {
      color: colors[i],
      size: 12
    }
  };
  data.push(result);
}

var layout = {
  showlegend: false,
  plot_bgcolor: 'transparent',
  paper_bgcolor:'transparent',

  xaxis: {
    showline: true,
    showgrid: false,
    showticklabels: true,
    linecolor: 'rgb(204,204,204)',
    linewidth: 2,
    autotick: false,
    automargin: true,
    ticks: 'outside',
    tickcolor: 'rgb(204,204,204)',
    tickwidth: 2,
    ticklen: 5,
    tickfont: {
      family: 'Lato',
      size: 10,
      color: 'rgb(82, 82, 82)'
    }
  },
  yaxis: {
    showgrid: false,
    zeroline: false,
    showline: false,
    showticklabels: true
  },


  annotations: [

  ]
};

for( var i = 0 ; i < xData.length ; i++ ) {
  var result = {
    xref: 'paper',
    x: 0.05,
    y: yData[i][0],
    xanchor: 'right',
    yanchor: 'middle',
    text: '',
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

var config = {responsive: true}

Plotly.newPlot('timeline', data, layout,config);
