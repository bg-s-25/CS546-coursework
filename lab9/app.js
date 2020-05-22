/**
    Title  : CS 546 A - Lab 9
    Desc   : Palindromes: Part 2 [Client-side JS]
    Name   : Bobby Georgiou
    Date   : 04/15/2020
    Pledge : "I pledge my honor that I have abided by the Stevens Honor System."
 */

const express = require('express')
const app = express()

// set directory for static assets
app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes
app.get('/', (_, res) => {
    res.sendFile('public/index.html', { root: __dirname })
})
app.use('*', (_, res) => {
  res.status(404).json({ error: "Not found" })
})

app.listen(3000, () => {
    console.log("Server starting")
    console.log("Routes now running on http://localhost:3000")
})
