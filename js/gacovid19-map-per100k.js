Plotly.d3.csv('https://www.margotbits.com/gacovid19/csv/gacounties.csv', function(err, rows){
  //https://raw.githubusercontent.com/plotly/datasets/master/2014_us_cities.csv
  //https://www.margotbits.com/gacovid19/csv/gacounties.csv

    function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
    }

    var cityName = unpack(rows, 'county'),
        cityCases = unpack(rows, 'cases'),
        cityLat = unpack(rows, 'lat'),
        cityLon = unpack(rows, 'lon'),
        cityPop = unpack(rows,'pop'),
        color = [,"rgb(255,65,54)","rgb(133,20,75)","rgb(255,133,27)","lightgrey"],
        citySize = [],
        hoverText = [],
        scale = 10;

    for ( var i = 0 ; i < cityCases.length; i++) {
        var currentSize = (cityCases[i] / pop);
        var currentText = cityName[i] + " County<br>" + "Cases: " + cityCases[i] + "<br>Population: " + cityPop[i];
        citySize.push(currentSize);
        hoverText.push(currentText);

        if (cityName[i] == "Unknown") {
          var unknownCases = cityCases[i];
          var unknownCasesPercent = ((i-1)/159*100).toFixed(2);
        }

        if (cityName[i] == "Non-Georgia Resident") {
          var nonGeorgiaCases = cityCases[i];
        }
    }

    document.getElementById('unknown-cases').innerHTML = unknownCases;
    document.getElementById('unknown-cases-percent').innerHTML = unknownCasesPercent;
    document.getElementById('nongeorgia-cases').innerHTML = nonGeorgiaCases;

    var data = [{
        type: 'scattergeo',
        locationmode: 'USA-states',
        lat: cityLat,
        lon: cityLon,
        hoverinfo: 'text',
        text: hoverText,
        marker: {
            size: citySize,
            line: {
                color: 'black',
                width: 2
            },
        }
    }];

    var layout = {
        showlegend: false,
        plot_bgcolor: 'transparent',
        paper_bgcolor:'transparent',
        margin: { r: 40, t: 0, b: 0, l: 0 },
        title: {
          text: "Unknown: 229"
        },
        geo: {
            scope: 'usa',
            center: {lon: -83.5, lat: 32.658152},
            projection: {
                type: 'albers usa',
                scale: 6
            },
            showland: true,
            bgcolor: 'transparent',
            landcolor: 'rgb(217, 217, 217)',
            subunitwidth: 1,
            countrywidth: 1,
            subunitcolor: 'rgb(255,255,255)',
            countrycolor: 'rgb(255,255,255)'
        },
    };

    var config = {
      responsive: true,
      showLink: false
    }

    Plotly.newPlot("gaMapper100k", data, layout, config);

});
