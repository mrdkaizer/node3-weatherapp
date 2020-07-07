const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()
const port = process.env.PORT || 3000

// Define Paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public') //directory for our static files
const viewsPath = path.join(__dirname, '../templates/views') //directory for our dynamic html files
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs') // set view engine as handle bars
app.set('views', viewsPath) // set the directory for our dynamic html files
hbs.registerPartials(partialsPath)

// set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/', (req,res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'Demetris Kaizer'
    })
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title: 'About',
        name: 'Demetris Kaizer'
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        helpText: 'this is just a testing application',
        title: 'Help',
        name: 'Demetris Kaizer'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
        if(error){
            return res.send({
                error: 'Unable to find location. Please try another search.'
            })
        }
        forecast(longitude, latitude, (error, forecastData)=>{
            if(error){
                return res.send({
                    error: 'Something went wrong with forecast api. Please try again later'
                })
                
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res)=>{
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    req.query.search
    res.send({
        products: []
    })
})

app.get('/help/*',(req, res)=>{
    res.render('404',{
        title: 'Error 404',
        error: 'Article not found',
        name: 'Demetris Kaizer'
    })
})

app.get('*', (req, res)=>{
    res.render('404',{
        title: 'Error 404',
        error: 'Page not found',
        name: 'Demetris Kaizer'
    })
})

// listen at port 3000
app.listen(port, ()=>{
    console.log('Server is up on port '+ port)
})