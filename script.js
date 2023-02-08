//Define access token
mapboxgl.accessToken = 'pk.eyJ1IjoibGdzbWl0aCIsImEiOiJja29uNGs1cmYwYnN2MnBwMzM2cDQyN2NrIn0.lZvjUUK8Pc2JDq0tuSRrKQ';

//Initialize map
var map = new mapboxgl.Map({
    container: 'map', //container id in HTML
    style: 'mapbox://styles/mapbox/streets-v12',  //stylesheet location
    center: [-79.39, 43.72],  // starting point, longitude/latitude
    zoom: 10 // starting zoom level
});

//After map load event, add data sources and draw layers
map.on('load', () => {

    /*ADDING A SOURCE FROM A GEOJSON FILE*/
    map.addSource('uoft', {
        type: 'geojson',
        data: {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "properties": {
                        "name": "Sidney Smith Hall"
                    },
                    "geometry": {
                        "coordinates": [
                            -79.39865237301687,
                            43.662343395037766
                        ],
                        "type": "Point"
                    }
                }
            ]
        }
    });

    map.addLayer({
        'id': 'uoft-buildings',
        'type': 'circle',
        'source': 'uoft',
        'paint': {
            'circle-radius': 6,
            'circle-color': '#B42222'
        }

    });

    //GeoJSON must direct to URL 
    map.addSource('toronto-mus', {
        type: 'geojson',
        data: 'https://smith-lg.github.io/ggr472-lab2/data/torontomusicvenues.geojson'
        //'https://raw.githubusercontent.com/smith-lg/ggr472-lab2/main/data/torontomusicvenues.geojson'

    });

    //Draw GeoJSON as circles
    map.addLayer({
        'id': 'toronto-mus-pnts',
        'type': 'circle',
        'source': 'toronto-mus',
        'paint': {
            'circle-radius': 5,
            'circle-color': 'blue'
        }

    });

    //Draw GeoJSON labels using 'name' property
    map.addLayer({
        'id': 'toronto-mus-labels',
        'type': 'symbol',
        'source': 'toronto-mus',
        'layout': {
            'text-field': ['get', 'name'],
            'text-variable-anchor': ['bottom'],
            'text-radial-offset': 0.5,
            'text-justify': 'auto'
        }
    });

    /*ADDING A SOURCE FROM A MAPBOX TILESET - DATA YOU UPLOADED TO MAPBOX STUDIO*/
    // map.addSource('toronto-music', {
    //     'type': 'vector',
    //     'url': 'mapbox://lgsmith.0vf6gaz4'
    // });

    // map.addLayer({
    //     'id': 'toronto-music-pnts',
    //     'type': 'circle',
    //     'source': 'toronto-music',
    //     'paint': {
    //         'circle-color': 'red',
    //         'circle-radius': 10
    //     },
    //     'source-layer': 'torontomusicvenues-06xluo' //get this from mapbox tileset page
    // },

    // );

    map.addSource('toronto-ct', {
        'type': 'vector',
        'url': 'mapbox://lgsmith.7noc8x5w'
    });

    map.addLayer({
        'id': 'toronto-ct-fill',
        'type': 'fill',
        'source': 'toronto-ct',
        'paint': {
            'fill-color': '#888888',
            'fill-opacity': 0.4,
            'fill-outline-color': 'black'
        },
        'source-layer': 'torontoct-7n3sj5' //get this from mapbox tileset page
    },
        'uoft-buildings'
        //Drawing order - places layer below points
        //Here the addlayer method takes 2 arguments (the layer as an object and a string for another layer's name)
        //If the other layer already exists, the new layer will be drawn before that one
    );




});



