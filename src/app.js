const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const foreCast = require('./utils/forecast');


const app = express();
const port = process.env.PORT || 3000;


//define paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directories to serve
app.use(express.static(publicDirPath));

 app.get('', function(req, res){
    res.render('index', {
        title: 'Weather',
        name: 'Sandeep Swami'
    });
});

app.get('/about', function(req, res){
    res.render('about', {
        title: 'About Me',
        descrption: 'This is Sandeep Swami.',
        name: 'Sandeep Swami'
    });
});

app.get('/help', function(req, res){
    res.render('help', {
        title: 'Help',
        descrption: 'For connecting with Sandeep call on.. ',
        name: 'Sandeep Swami'
    });
});

app.get('/weather', function(req, res){
    
    const address = req.query.address;
    if(!address){
        return res.send('No Address for Forecast found !');
    }    
    geoCode.geocode(address, function(err, data){
        if(err){
            return res.send(err);
        }
        foreCast.forecast(data, function(err, foreCastdata){
            if(err){
                return res.send(err);
            }

            res.send({
                forcast: foreCastdata,
                location: address
            });
        });
    });
});

app.get('/products', function(req, res){
    console.log(req.query);
    res.send({
        forecast: 'Today is a happy day',
        location: 'Pune'
    });
});

app.get('/help/*', function(req, res){
    res.render('error', {
        title: 'NoHelp',
        errorMsg: 'Help Article Not found',
        name: 'Sandeep Swami'
    });
});

//If none of the above route is found, this is generic route.
app.get('*', function(req, res){
    res.render('error', {
        title: '404 Page',
        errorMsg: 'No Page Found..',
        name: 'Sandeep Swami'
    });
});


app.listen(port, function(){
    console.log('server started on port ' + port);
});

 