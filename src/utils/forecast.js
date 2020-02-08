const request = require('request');


const forecast = function(data, callback){

    const latitude = data.latitude;
    const longitude = data.longitude;

    //const url = 'https://api.darksky.net/forecast/42da865013e607e059a47efcb2ffc6e4/37.8267,-122.4233';
    const url = 'https://api.darksky.net/forecast/42da865013e607e059a47efcb2ffc6e4/'+ latitude +',' + longitude;
    console.log(url);

    request({ url : url, json : true}, function (err, data) {        
        if(err){
            callback(err, undefined);            
        }
        else if(data){
            callback(undefined, data.body.daily.summary);            
        }
    });
};

module.exports = {
    forecast: forecast
}