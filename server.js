const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')


app.use((req, res, next) => {
    var now = new Date().toString()
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log)
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('unable to create log file')
        }
    })
    next()
})


app.use((req, res) => {
    res.render('maintaince.hbs', {
        pageTitle: 'We will be right back',
    })
})

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})

hbs.registerHelper('screamer', (text) => {
    return text.toUpperCase()
})

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home',
        welcome: 'Welcome to home page',
    })

})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    })
})

app.get('/bad', (req, res) => {
    res.send({
        error: 'unable to respond to server'
    })
})
app.listen(5000, () => {
    console.log('server is up on 5000')
});