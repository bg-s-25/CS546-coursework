/**
    Title  : CS 546 A - Lab 2
    Desc   : Modules and Error Checking
    Name   : Bobby Georgiou
    Date   : 02/11/2020
    Pledge : "I pledge my honor that I have abided by the Stevens Honor System."
 */

/* Error checking for deepEquality */
function checkInputObj(varName, val) {
    if (val == null) {
        throw `Error: ${varName} not provided`
    } else if (typeof val != 'object') {
        throw `Error: ${varName} argument "${val}" is not an object`
    }
}

/* Checks each field of two objects (at every level deep) for equality */
function deepEquality(obj1, obj2) {
    checkInputObj("Obj1", obj1)
    checkInputObj("Obj2", obj2)
    let obj1Keys = Object.keys(obj1)
    let obj2Keys = Object.keys(obj2)
    let equality = true

    if (obj1Keys.length == obj2Keys.length) {
        for (let i = 0; i < obj1Keys.length; ++i) {
            if (typeof obj1[obj1Keys[i]] == 'object' && typeof obj2[obj1Keys[i]] == 'object') {
                // object values are both also objects
                equality = deepEquality(obj1[obj1Keys[i]], obj2[obj1Keys[i]])
            } else if (obj1[obj1Keys[i]] !== obj2[obj1Keys[i]]) {
                // object values are not objects and are not explicitly equal
                equality = false
                break
            }
        }
    } else {
        equality = false
    }

    return equality
}

/* Return the nummber of unique elements in an array */
function uniqueElements(arr) {
    if (arr == null) {
        throw "Error: Arr not provided"
    } else if (typeof arr != 'object') {
        throw `Error: Arr argument "${arr}" is not an array`
    }
    let tracker = {}

    for (let i = 0; i < arr.length; ++i) {
        if (!tracker.hasOwnProperty(arr[i])) {
            // tracker does not contain current item, is unique
            tracker[arr[i]] = true
        }
    }

    return Object.keys(tracker).length
}

/* Create and return an object that contains the number of occurrences of each character in a string */
function countOfEachCharacterInString(str) {
    if (str == null) {
        throw "Error: Str not provided"
    } else if (typeof str != 'string') {
        throw `Error: Str argument "${str}" is not a string`
    }
    let charMap = {}

    str.split("").forEach((c) => {
        if (!charMap.hasOwnProperty(c)) {
            // charMap does not contain current character
            charMap[c] = 1
        } else {
            // charMap contains the character, increment by 1
            charMap[c]++
        }
    })

    return charMap
}

module.exports = {deepEquality, uniqueElements, countOfEachCharacterInString}
