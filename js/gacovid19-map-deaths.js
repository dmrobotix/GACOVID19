Plotly.d3.csv('https://www.margotbits.com/gacovid19/csv/gacounties.csv', function(err, rows){
  //https://raw.githubusercontent.com/plotly/datasets/master/2014_us_cities.csv
  //https://www.margotbits.com/gacovid19/csv/gacounties.csv

    function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
    }

    var cityName = unpack(rows, 'county'),
        cityCases = unpack(rows, 'deaths'),
        cityLat = unpack(rows, 'lat'),
        cityLon = unpack(rows, 'lon'),
        color = [,"rgb(255,65,54)","rgb(133,20,75)","rgb(255,133,27)","lightgrey"],
        citySize = [],
        hoverText = [],
        scale = 2;
    var unknownDeaths = 0;
    for ( var i = 0 ; i < cityCases.length; i++) {
        var currentSize = cityCases[i] / scale;
        var currentText = cityName[i] + " County<br>" + "Cases: " + cityCases[i];
        citySize.push(currentSize);
        hoverText.push(currentText);

        if(Number(cityCases[i]) > 0) {
          unknownDeaths += 1;
        }
        var unknownDeathsPercent = (unknownDeaths/159*100).toFixed(2);

        if (cityName[i] == "Non-Georgia Resident") {
          var nonGeorgiaDeaths = cityCases[i];
        }
    }

    document.getElementById('unknown-deaths').innerHTML = unknownDeaths;
    document.getElementById('unknown-deaths-percent').innerHTML = unknownDeathsPercent;
    document.getElementById('nongeorgia-deaths').innerHTML = nonGeorgiaDeaths;

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

    Plotly.newPlot("gaMapDeaths", data, layout, config);

});
