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
  '4/1/20',
  '4/2/20',
  '4/3/20',
  '4/4/20',
  '4/5/20',
  '4/6/20'
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
    4748,
    5444,
    5967,
    6383,
    6742,
    7558
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
    154,
    176,
    198,
    208,
    219,
    294
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
    1013,
    1129,
    1222,
    1266,
    1296,
    1332,
    1393
  ]
];

document.getElementById('cases').innerHTML = yData[0][yData[0].length-1];
document.getElementById('deaths').innerHTML = yData[1][yData[1].length-1];
document.getElementById('hospitalized').innerHTML = yData[2][yData[2].length-1];
document.getElementById('unknown-cases').innerHTML = 309;
document.getElementById('unknown-deaths').innerHTML = 5;
document.getElementById('unknown-cases-percent').innerHTML = 97.5;
document.getElementById('unknown-deaths-percent').innerHTML = 41;

var colors = ['rgba(0,0,0,1)', 'rgba(0,191,255,1)','rgba(134, 33, 255, 1)'];

var lineSize = [2, 2, 4, 2];

var labels = ['Confirmed'];

var names = ['Cases', 'Deaths','Hospitalized'];

var trace1 = {
  x: xData[0],
  y: yData[0],
  type: 'scatter',
  mode: 'lines',
  name: names[0],
  line: {
    color: colors[0],
    width: lineSize[0]
  }
};

var trace2 = {
  x: xData[2],
  y: yData[2],
  type: 'scatter',
  mode: 'lines',
  name: names[2],
  line: {
    color: colors[2],
    width: lineSize[2]
  }
};

var trace3 = {
  x: xData[1],
  y: yData[1],
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
