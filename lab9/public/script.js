/**
    Title  : CS 546 A - Lab 9
    Desc   : Palindromes: Part 2 [Client-side JS]
    Name   : Bobby Georgiou
    Date   : 04/15/2020
    Pledge : "I pledge my honor that I have abided by the Stevens Honor System."
 */

let myForm = document.getElementById("myForm")
let myTextInput = document.getElementById("myTextInput")
let myOl = document.getElementById("attempts")

// attach submit event listener to form
if (myForm) {
    myForm.addEventListener('submit', (event) => {
        event.preventDefault()
        if (myTextInput.value) {
            let li = document.createElement("li")
            li.innerHTML = myTextInput.value
            li.className = isPalindrome(myTextInput.value) ? "is-palindrome" : "not-palindrome"
            myOl.appendChild(li)
            myForm.reset()
            myTextInput.focus()
        } else {
            alert("No text was entered.")
            myTextInput.focus()
        }
    })
}

/* Check if the string is a palindrome */
function isPalindrome(text) {
    text = text.toLowerCase().replace(/[^0-9a-z]/gi, '')
    if (text.length == 0) return false

    // reverse text and compare
    let newText = text.split('').reverse().join('')
    return newText === text
}
