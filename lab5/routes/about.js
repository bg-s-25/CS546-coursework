/**
    Title  : CS 546 A - Lab 5
    Desc   : JSON Routes
    Name   : Bobby Georgiou
    Date   : 03/05/2020
    Pledge : "I pledge my honor that I have abided by the Stevens Honor System."
 */

const express = require('express')
const router = express.Router()
const aboutData = require('../data').about

/* GET route for /about */
router.get('/', async (_, res) => {
  try {
    res.json(aboutData)
  } catch (e) {
    res.status(404).json({ error: "Not found" })
  }
})

module.exports = router
