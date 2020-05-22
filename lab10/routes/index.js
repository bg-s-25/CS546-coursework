/**
    Title  : CS 546 A - Lab 10
    Desc   : Authentication and Middleware
    Name   : Bobby Georgiou
    Date   : 04/28/2020
    Pledge : "I pledge my honor that I have abided by the Stevens Honor System."
 */

const users = require('../data/users')
const bcrypt = require('bcrypt')

const constructorMethod = app => {

  /* GET method for / */
  app.get('/', (req, res) => {
    // check if user is authenticated
    if (req.session.user) {
      res.redirect('/private')
    } else {
      let errText = ''
      if (req.query.err && req.query.err.toLowerCase() == 'ya') errText = "Login failed. Invalid username and/or password."
      res.render('layouts/main', { layout: false, errorMsg: errText })
    }
  })

  /* POST method for /login */
  app.post('/login', async (req, res) => {
    // attempt to login user with provided credentials
    if (!req.body['username'] || !req.body['password'] || req.body['username'].trim() === '' || req.body['password'].trim() === '') {
      res.status(401).redirect('/?err=ya')
    } else {
      // username & password data received
      let userObj = users.find(user => user.username.toLowerCase() === req.body['username'].toLowerCase())
      if (userObj) {
        let passMatch = await bcrypt.compare(req.body['password'], userObj.hashedPassword)
        .catch((err) => console.error(err))
        if (passMatch) {
          // create cookie, set expiration, redirect to private
          let expiresIn = new Date()
          expiresIn.setHours(expiresIn.getHours() + 1)
          req.session.user = userObj
          req.session.cookie.expires = expiresIn
          res.redirect('/private')
          return
        }
      }
      // access denied
      res.status(401).redirect('/?err=ya')
    }
  })

  /* GET method for /private */
  app.get('/private', (req, res) => {
    // only displays info to authenticated users (due to authentication middleware)
    res.render('layouts/private', { layout: false, reqbody: req.session.user })
  })

  /* GET method for /logout */
  app.get('/logout', (req, res) => {
    // destroy session & display logout page
    req.session.destroy()
    res.render('layouts/logout', { layout: false })
  })

  app.use('*', (_, res) => {
    res.status(404).json({ error: "Not found" })
  })

}

module.exports = constructorMethod
