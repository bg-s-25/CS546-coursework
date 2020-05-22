/**
    Title  : CS 546 A - Lab 3
    Desc   : Asynchronous Code, Files, and Promises
    Name   : Bobby Georgiou
    Date   : 02/18/2020
    Pledge : "I pledge my honor that I have abided by the Stevens Honor System."
 */

const bluebird = require("bluebird");
const Promise = bluebird.Promise;

// all methods in module fs will return promises
const fs = bluebird.promisifyAll(require("fs"))

/* Given a path, returns a promise that resolves to the text read from the file */
async function getFileAsString(path) {
    if (!path || typeof path != 'string') throw "Error: A path was not specified"
    let data = null

    // try to read
    try {
        data = await fs.readFileAsync(path, 'utf-8')
    } catch (_) {
        throw "Error: Unable to read file"
    }
    return data
}

/* Given a path, attempts to read the file and parse to JSON, and returns a promise that resolves to the object */
async function getFileAsJSON(path) {
    if (!path || typeof path != 'string') throw "Error: A path was not specified"
    let data = null

    // try to read
    try {
        data = await fs.readFileAsync(path, 'utf-8')
    } catch (_) {
        throw "Error: Unable to read file"
    }

    // try to parse
    try {
        return JSON.parse(data)
    } catch (_) {
        throw "Error: Unable to parse to JSON"
    }
}

/* Given a path & text, writes the text to a file, and returns a promise that resolves to true if successful */
async function saveStringToFile(path, text) {
    if (!path || typeof path != 'string') throw "Error: A path was not specified"
    if (!text || typeof path != 'string') throw "Error: Text was not provided"

    // try to write
    try {
        await fs.writeFileAsync(path, text)
        return true
    } catch (_) {
        throw "Error: Unable to write file"
    }
}

/* Given a path & object, attempts to convert the object to a string, write the text to a file, and returns a promise that resolves to true if successful */
async function saveJSONToFile(path, obj) {
    if (!path || typeof path != 'string') throw "Error: A path was not specified"
    if (!obj || typeof path != 'string') throw "Error: Object was not provided"
    let objStr = null

    // try to parse
    try {
        objStr = JSON.stringify(obj, null, '\t')
    } catch (_) {
        throw "Error: Unable to stringify object"
    }

    // try to write
    try {
        await fs.writeFileAsync(path, objStr)
        return true
    } catch (_) {
        throw "Error: Unable to write file"
    }
}

module.exports = {getFileAsString, getFileAsJSON, saveStringToFile, saveJSONToFile}
