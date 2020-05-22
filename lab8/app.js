/**
    Title  : CS 546 A - Lab 8
    Desc   : Palindromes: Part 1 [HTML, CSS, Express Handlebars]
    Name   : Bobby Georgiou
    Date   : 04/05/2020
    Pledge : "I pledge my honor that I have abided by the Stevens Honor System."
 */

const express = require('express')
const app = express()
const static = express.static(__dirname + '/public')

const configRoutes = require('./routes')
const exphbs = require('express-handlebars')

// set directory for static assets
app.use('/public', static)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// set view engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

configRoutes(app)

app.listen(3000, () => {
    console.log("Server starting")
    console.log("Routes now running on http://localhost:3000")
})
