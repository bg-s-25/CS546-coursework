/**
    Title  : CS 546 A - Lab 5
    Desc   : JSON Routes
    Name   : Bobby Georgiou
    Date   : 03/05/2020
    Pledge : "I pledge my honor that I have abided by the Stevens Honor System."
 */

const express = require('express')
const app = express()
const configRoutes = require('./routes')

configRoutes(app)

/* Start the server */
app.listen(3000, () => {
  console.log("Server starting")
  console.log("Routes will be running on http://localhost:3000")
})
