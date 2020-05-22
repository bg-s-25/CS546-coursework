/**
    Title  : CS 546 A - Lab 3
    Desc   : Asynchronous Code, Files, and Promises
    Name   : Bobby Georgiou
    Date   : 02/18/2020
    Pledge : "I pledge my honor that I have abided by the Stevens Honor System."
 */

const vowels = ['a', 'e', 'i', 'o', 'u']

/* Given text, returns an object containing a set of metrics describing the text */
function createMetrics(text) {
    if (!text || typeof text != 'string') {
        throw "Error: Text was not provided"
    }
    let totalLetters = 0
    let totalNonLetters = 0
    let totalWords = 0
    let totalVowels = 0
    let totalConsonants = 0
    let uniqueWords = 0
    let longWords = 0
    let averageWordLength = 0
    let wordOccurrences = {}
    let makingWord = false
    let curWord = ''
    let wordLengthsSum = 0

    // do some stuff when the end of a word is reached
    function wordDone() {
        totalWords++
        wordLengthsSum += curWord.length
        if (curWord.length >= 6) longWords++
        if (Object.keys(wordOccurrences).indexOf(curWord) === -1) {
            // not in the object
            wordOccurrences[curWord] = 1
        } else {
            wordOccurrences[curWord] += 1
        }
    }

    for (let i = 0; i < text.length; ++i) {
        let c = text.charAt(i).toLowerCase()
        
        if (c != c.toUpperCase()) {
            // letter
            totalLetters++
            if (vowels.indexOf(c) >= 0) {
                totalVowels++
            } else {
                totalConsonants++
            }
            makingWord = true
            curWord += c
        } else {
            // non-letter
            totalNonLetters++
            if (makingWord) {
                wordDone()
                curWord = ''
                makingWord = false
            }
        }

        // in case word ends at the end of string
        if (i == text.length - 1 && makingWord) {
            wordDone()
        }
    }

    // set average word length & unqiue words
    averageWordLength = wordLengthsSum / totalWords
    uniqueWords = Object.keys(wordOccurrences).length

    return {
        "totalLetters": totalLetters,
        "totalNonLetters": totalNonLetters,
        "totalWords": totalWords,
        "totalVowels": totalVowels,
        "totalConsonants": totalConsonants,
        "uniqueWords": uniqueWords,
        "longWords": longWords,
        "averageWordLength": averageWordLength,
        "wordOccurrences": wordOccurrences
    }
}

module.exports = {createMetrics}
