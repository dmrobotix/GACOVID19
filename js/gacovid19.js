"use strict"
var dates = [
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
  '3/21/20',
  '3/22/20',
  '3/23/20',
  '3/24/20',
  '3/25/20',
  '3/26/20',
  '3/27/20',
  '3/28/20',
  '3/29/20',
  '3/30/20',
  '3/31/20',
  '4/1/20'
]
var xData = [
  dates,
  dates,
  dates
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
    555,
    620,
    800,
    1097,
    1387,
    1643,
    2198,
    2446,
    2683,
    3028,
    4117,
    4748
  ],
  [
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    4,
    10,
    14,
    20,
    25,
    26,
    38,
    47,
    56,
    65,
    69,
    79,
    83,
    100,
    125,
    154
  ],
  [
    NaN,
    NaN,
    NaN,
    NaN,
    NaN,
    NaN,
    NaN,
    NaN,
    NaN,
    NaN,
    NaN,
    NaN,
    NaN,
    NaN,
    NaN,
    NaN,
    361,
    438,
    509,
    607,
    660,
    678,
    771,
    885,
    1013
  ]
  /*[
    Math.log(0),
    Math.log(2),
    Math.log(2),
    Math.log(17),
    Math.log(31),
    Math.log(42),
    Math.log(42),
    Math.log(64),
    Math.log(121),
    Math.log(146),
    Math.log(197),
    Math.log(287),
    Math.log(485),
    Math.log(555),
    Math.log(620)
  ]*/
];

var colors = ['rgba(0,0,0,1)', 'rgba(0,191,255,1)','rgba(134, 33, 255, 1)'];

var lineSize = [2, 2, 4, 2];

var labels = ['Confirmed'];

var data = [];

var names = ['Cases', 'Deaths','Hospitalized'];

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
  data.push(result);
}

var layout = {
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
    linecolor: 'rgb(0,0,0)',
    linewidth: 2,
    autotick: false,
    automargin: true,
    ticks: 'outside',
    tickcolor: 'rgb(0,0,0)',
    tickwidth: 2,
    ticklen: 5,
    tickfont: {
      family: 'Lato',
      size: 10,
      color: 'rgb(0,0,0)'
    }
  },
  yaxis: {
    title: 'Number of Confirmed',
    tickfont: {
      family: 'Lato',
      size: 10,
      color: 'rgb(0,0,0)'
    },
    showgrid: false,
    zeroline: false,
    showline: false,
    showticklabels: true
  }
};


var config = {responsive: true}

Plotly.newPlot('timeline', data, layout,config);
