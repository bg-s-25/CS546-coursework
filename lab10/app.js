/**
    Title  : CS 546 A - Lab 10
    Desc   : Authentication and Middleware
    Name   : Bobby Georgiou
    Date   : 04/28/2020
    Pledge : "I pledge my honor that I have abided by the Stevens Honor System."
 */

const express = require('express')
const app = express()
const session = require('express-session')
const configRoutes = require('./routes')
const exphbs = require('express-handlebars')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// init session
app.use(session({
    name: 'AuthCookie',
    secret: 'some secret string!',
    resave: false,
    saveUninitialized: true
}))

// authentication middleware
app.use('/private', (req, res, next) => {
    // check if user is not authenticated
    if (!req.session.user) {
        res.status(403).send('<p>User is not logged in!</p>')
    } else {
        next()
    }
})

// logging middleware
app.use(async (req, _, next) => {
    let authUserText = req.session.user ? "Authenticated User" : "Non-Authenticated User"
    console.log(`[${new Date().toUTCString()}]: ${req.method} ${req.originalUrl} (by ${authUserText})`)
    next()
})

// set view engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

configRoutes(app)

app.listen(3000, () => {
    console.log("Server starting")
    console.log("Routes now running on http://localhost:3000")
})
