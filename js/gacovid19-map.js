Plotly.d3.csv('https://www.margotbits.com/gacovid19/csv/gacounties.csv', function(err, rows){

    function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
    }

    var cityName = unpack(rows, 'county'),
        cityPop = unpack(rows, 'case'),
        cityLat = unpack(rows, 'lat'),
        cityLon = unpack(rows, 'lon'),
        color = [,"rgb(255,65,54)","rgb(133,20,75)","rgb(255,133,27)","lightgrey"],
        citySize = [],
        hoverText = [],
        scale = 50000;

    for ( var i = 0 ; i < cityPop.length; i++) {
        var currentSize = cityPop[i] / scale;
        var currentText = cityName[i] + " pop: " + cityPop[i];
        citySize.push(currentSize);
        hoverText.push(currentText);
    }

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
        title: '2014 US City Populations',
        showlegend: false,
        geo: {
            scope: 'usa',
            projection: {
                type: 'albers usa'
            },
            showland: true,
            landcolor: 'rgb(217, 217, 217)',
            subunitwidth: 1,
            countrywidth: 1,
            subunitcolor: 'rgb(255,255,255)',
            countrycolor: 'rgb(255,255,255)'
        },
    };

    Plotly.newPlot("gaMap", data, layout, {showLink: false});

});
