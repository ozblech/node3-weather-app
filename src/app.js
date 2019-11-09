const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

//Define paths for Express config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath =  path.join(__dirname,'../templates/views')
const partialsPath =  path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs') // handle bar set up
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))


app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Oz Blech'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About me',
        name: 'Oz Blech'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        helpMsg: 'How can i help?',
        title: 'Help',
        name: 'Oz Blech'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide address'
        })
    }
    geocode(req.query.address, (error,{latitude, longtitude, location} = {}) => {
        if(error) {
            return res.send({ error })
        }
        
        forecast(latitude,longtitude, (error, forecastdata) => {
            if(error) {
                return res.send({ error })
            }
           
            res.send({
                location: location,
                forecast: forecastdata,
                address: req.query.address
            })
        })
    })
    
})


app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        msgError: 'Help article not found',
        title: '404',
        name: 'Oz Blech'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        msgError: 'Page not found',
        title: '404',
        name: 'Oz Blech'
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})