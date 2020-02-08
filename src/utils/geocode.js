const request = require('request');

const geocode = function(address, callback){
    let formattedAddress = encodeURIComponent(address);;
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ formattedAddress +'.json?access_token=pk.eyJ1Ijoic2FuZGVlcC1zdyIsImEiOiJjazY5aWd1NXEwZzRsM3Buejl5bGozbWJ2In0._wqWVDf5GSNNILl5ezBplQ&limit=1';
    request({ url : url, json : true}, function(err, data){
    
        if(err){
            callback(err, undefined);
        }
        else if(data.body.features.length === 0){
            callback('unable to find location', undefined);
        }
        else{
            callback(undefined, {
                latitude: data.body.features[0].center[1],
                longitude: data.body.features[0].center[0],
                location: data.body.features[0].place_name,
            });
        }
    });
}

module.exports = {
    geocode: geocode
}