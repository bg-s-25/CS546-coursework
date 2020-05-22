/**
    Title  : CS 546 A - Lab 5
    Desc   : JSON Routes
    Name   : Bobby Georgiou
    Date   : 03/05/2020
    Pledge : "I pledge my honor that I have abided by the Stevens Honor System."
 */

const aboutRoutes = require('./about')
const storyRoutes = require('./story')
const educationRoutes = require('./education')

const constructorMethod = app => {
  app.use('/about', aboutRoutes)
  app.use('/story', storyRoutes)
  app.use('/education', educationRoutes)

  app.use('*', (_, res) => {
    res.status(404).json({ error: "Not found" })
  })
}

module.exports = constructorMethod
