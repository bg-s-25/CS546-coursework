/**
    Title  : CS 546 A - Lab 6
    Desc   : Band Application [MongoDB, API server]
    Name   : Bobby Georgiou
    Date   : 03/11/2020
    Pledge : "I pledge my honor that I have abided by the Stevens Honor System."
 */

const express = require('express')
const app = express()
const configRoutes = require('./routes')

app.use(express.json())
configRoutes(app)

/* Start the server */
app.listen(3000, () => {
  console.log("Server started")
  console.log("Routes will be running on http://localhost:3000")
})
