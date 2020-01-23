
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

// console.log(__dirname)
// console.log(__filename)
console.log(path.join(__dirname, '../public'))

const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew Mead'
    })
})
// app.get('', (req, resp) =>{
//     resp.send('Hello World')
// })

// app.get('', (req, resp) =>{
//     resp.send('<h1>Hello World</h1>')
// })


// app.get('/help', (req, resp) =>{
//     resp.send('Help page')
// })

// app.get('/help', (req, resp) =>{
//     resp.send({
//         name:'Andrew', age:27
//     })
// })
app.get('/help', (req, resp) =>{
    resp.render('help',{
        title:'Help', 
        msg:'Hello there!',
        name: 'Andrew'
    })
})

// app.get('/about', (req, resp) =>{
//     resp.send('About page')
// })

app.get('/about', (req, resp) =>{
    resp.render('about', {
        title: 'About Me',
        name: 'Andrew'
    })
})

app.get('/weather', (req, res) =>{

    if(!req.query.address) {
        return res.send({
            error: 'No Address Provided'
        })
    }
    // geocode(req.query.address, (error, {lat, long, location})=>{
    //     if(error){
    //         return res.send({
    //             error: error
    //         })
    //     }
    //     console.log(lat)
    //     console.log(long)
    //     forecast(lat, long, (error, forecastData) => {
    //         if(error){
    //             return res.send({error})
    //         }
    //         res.send({
    //             forecastData,
    //             location: location,
    //             address: req.query.address
    //         })
    //     })
    // })

    geocode(req.query.address, (error, {latitude, longitude, location} ={}) => {
        if(error)
        {
            return res.send({error})
        }
        // console.log('Data', data)
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecastData,
                location,
                address: req.query.address
            })
          })
    })

})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) =>{
    res.render('404page', {
        name: 'Andrew',
        errorMessage:'Help article not found'
    })
})

app.get('*', (req,res) =>{
    res.render('404page', {
        name: 'Andrew',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Up on port 3000')
})