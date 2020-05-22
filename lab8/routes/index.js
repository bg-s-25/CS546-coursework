/**
    Title  : CS 546 A - Lab 8
    Desc   : Palindromes: Part 1 [HTML, CSS, Express Handlebars]
    Name   : Bobby Georgiou
    Date   : 04/05/2020
    Pledge : "I pledge my honor that I have abided by the Stevens Honor System."
 */

const palindromeCheck = require('../public/palindromeCheck')

const constructorMethod = app => {
  /* GET method for / */
  app.get('/', (_, res) => {
    res.render('layouts/main')
  })
  
  /* POST method for /result */
  app.post('/result', (req, res) => {
    // error check
    if (!req.body['text-to-test'] || req.body['text-to-test'].trim() === '') {
      res.status(400).render('result/index', {layout: false, resultbody: `<p class="error">Error: A valid piece of text was not receieved.</p>`})
    } else {
      // check if text is a palindrome & render the result page
      const testingText = req.body['text-to-test']
      if (palindromeCheck.isPalindrome(testingText)) {
        res.render('result/index', {layout: false, resultbody: `<p class="success">${testingText}</p><p>This is indeed a palindrome!</p>`})
      } else {
        res.render('result/index', {layout: false, resultbody: `<p class="failure">${testingText}</p><p>This is not a palindrome.</p>`})
      }
    }
  })
  
  app.use('*', (_, res) => {
    res.status(404).json({ error: "Not found" })
  })
}

module.exports = constructorMethod
