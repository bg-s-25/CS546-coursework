/**
    Title  : CS 546 A - Lab 3
    Desc   : Asynchronous Code, Files, and Promises
    Name   : Bobby Georgiou
    Date   : 02/18/2020
    Pledge : "I pledge my honor that I have abided by the Stevens Honor System."
 */

const fileData = require('./fileData')
const textMetrics = require('./textMetrics')

/* Save text metrics object to a file */
async function saveMetrics(file, metrics) {
    const name = file.replace('.txt', '')
    await fileData.saveJSONToFile(name + '.result.json', metrics)
    .catch((err) => {
        console.error(err)
    })
    .then((result) => {
        if (result) console.log(metrics)
    })
}

/* Get metrics for the specified text; pass the metrics object to saveMetrics */
async function makeMetrics(file, text) {
    let metrics = null
    try {
        metrics = textMetrics.createMetrics(text)
    } catch (err) {
        console.error(err)
    }
    await saveMetrics(file, metrics)
    .catch((err) => {
        console.error(err)
    })
}

/* Try to read text from the file; pass the text to makeMetrics */
async function readTextFile(file) {
    await fileData.getFileAsString(file)
    .catch((err) => {
        console.error(err)
    })
    .then((contentStr) => {
        if (contentStr) {
            (async function() {
                await makeMetrics(file, contentStr)
            })()
        }
    })
}

/* Given a file path, check for an existing corresponding metrics file & print results; otherwise, read the file & run metrics */
async function doMetrics(file) {
    if (!file || typeof file != 'string') throw "Error: A file was not specified"
    const name = file.replace('.txt', '')
    await fileData.getFileAsJSON(name + '.result.json')
    .catch((_) => {
        // results file not found, run metrics on text
        (async function() {
            await readTextFile(file)
        })()
    })
    .then((contentJson) => {
        // results file already exists, print results
        if (contentJson) console.log(contentJson)
    })
}

// do metrics for test files
doMetrics('chapter1.txt')
.catch((err) => {
    console.error(err)
})
doMetrics('chapter2.txt')
.catch((err) => {
    console.error(err)
})
doMetrics('chapter3.txt')
.catch((err) => {
    console.error(err)
})
