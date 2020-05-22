/**
    Title  : CS 546 A - Lab 8
    Desc   : Palindromes: Part 1 [HTML, CSS, Express Handlebars]
    Name   : Bobby Georgiou
    Date   : 04/05/2020
    Pledge : "I pledge my honor that I have abided by the Stevens Honor System."
 */

/* Check if the string is a palindrome */
function isPalindrome(text) {
    text = text.toLowerCase().replace(/[^0-9a-z]/gi, '')
    if (text.length == 0) return false

    // reverse text and compare
    let newText = text.split('').reverse().join('')
    return newText === text
}

module.exports = {isPalindrome}
