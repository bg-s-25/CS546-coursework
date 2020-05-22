/**
    Title  : CS 546 A - Lab 2
    Desc   : Modules and Error Checking
    Name   : Bobby Georgiou
    Date   : 02/11/2020
    Pledge : "I pledge my honor that I have abided by the Stevens Honor System."
 */

const geom = require("./geometry")
const utils = require("./utilities")

/* Tests for volumeOfRectangularPrism */

try {
    console.log(geom.volumeOfRectangularPrism(4, 4)) // error
} catch (e) {
    console.log(e)
}

try {
    console.log(geom.volumeOfRectangularPrism(3, -2, 1)) // error
} catch (e) {
    console.log(e)
}

try {
    console.log(geom.volumeOfRectangularPrism(1, 0, 6)) // 0
} catch (e) {
    console.log(e)
}

try {
    console.log(geom.volumeOfRectangularPrism(7, 8, 9)) // 504
} catch (e) {
    console.log(e)
}

try {
    console.log(geom.volumeOfRectangularPrism(9, 12, 3)) // 321
} catch (e) {
    console.log(e)
}

/* Tests for surfaceAreaOfRectangularPrism */
console.log("")

try {
    console.log(geom.surfaceAreaOfRectangularPrism(4, 'hi', 6)) // error
} catch (e) {
    console.log(e)
}

try {
    console.log(geom.surfaceAreaOfRectangularPrism(-1, 0, 1)) // error
} catch (e) {
    console.log(e)
}

try {
    console.log(geom.surfaceAreaOfRectangularPrism(3, 1, 1)) // 14
} catch (e) {
    console.log(e)
}

try {
    console.log(geom.surfaceAreaOfRectangularPrism(3, 5, 7)) // 142
} catch (e) {
    console.log(e)
}

try {
    console.log(geom.surfaceAreaOfRectangularPrism(16, 11, 8)) // 784
} catch (e) {
    console.log(e)
}

/* Tests for volumeOfSphere */
console.log("")

try {
    console.log(geom.volumeOfSphere()) // error
} catch (e) {
    console.log(e)
}

try {
    console.log(geom.volumeOfSphere(-9)) // error
} catch (e) {
    console.log(e)
}

try {
    console.log(geom.volumeOfSphere(1)) // ~4.18
} catch (e) {
    console.log(e)
}

try {
    console.log(geom.volumeOfSphere(2)) // ~33.51
} catch (e) {
    console.log(e)
}

try {
    console.log(geom.volumeOfSphere(5)) // ~523.60
} catch (e) {
    console.log(e)
}

/* Tests for surfaceAreaOfSphere */
console.log("")

try {
    console.log(geom.surfaceAreaOfSphere('hm')) // error
} catch (e) {
    console.log(e)
}

try {
    console.log(geom.surfaceAreaOfSphere(-3)) // error
} catch (e) {
    console.log(e)
}

try {
    console.log(geom.surfaceAreaOfSphere(3)) // ~113.10
} catch (e) {
    console.log(e)
}

try {
    console.log(geom.surfaceAreaOfSphere(12)) // ~1809.56
} catch (e) {
    console.log(e)
}

try {
    console.log(geom.surfaceAreaOfSphere(20)) // ~5026.55
} catch (e) {
    console.log(e)
}

/* Tests for deepEquality */
console.log("")

const one = {a: 2, b: 3}
const two = {a: 2, b: 3}
const three = 42
const four = {a: {a : 3, b: 1}, b: 6}
const five = {a: {a : 3, b: 2}, b: 6}
const six = {a: {a : 3, b: 1}, b: 6}
const seven = {a: 1, b: {c: 2}}
const eight = {a: {b: 1}, c: {c: 2}}

try {
    console.log(utils.deepEquality(one, three)) // error
} catch (e) {
    console.log(e)
}

try {
    console.log(utils.deepEquality(one, two)) // true
} catch (e) {
    console.log(e)
}

try {
    console.log(utils.deepEquality(four, five)) // false
} catch (e) {
    console.log(e)
}

try {
    console.log(utils.deepEquality(four, six)) // true
} catch (e) {
    console.log(e)
}

try {
    console.log(utils.deepEquality(seven, eight)) // false
} catch (e) {
    console.log(e)
}

/* Tests for uniqueElements */
console.log("")

try {
    console.log(utils.uniqueElements()) // error
} catch (e) {
    console.log(e)
}

try {
    console.log(utils.uniqueElements(0)) // error
} catch (e) {
    console.log(e)
}

try {
    console.log(utils.uniqueElements([])) // 0
} catch (e) {
    console.log(e)
}

try {
    console.log(utils.uniqueElements([6, 8, 2, 7, 1, 4, 4, 6, 0, 9])) // 8
} catch (e) {
    console.log(e)
}

try {
    console.log(utils.uniqueElements(['p', 'i', 'z', 'z', 'e', 'r', 'i', 'a'])) // 6
} catch (e) {
    console.log(e)
}

/* Tests for countOfEachCharacterInString */
console.log("")

const str1 = "countOfEachCharacterInString"
const str2 = "Visual Studio Code"
const str3 = "Chocolate chip muffin"

try {
    console.log(utils.countOfEachCharacterInString()) // error
} catch (e) {
    console.log(e)
}

try {
    console.log(utils.countOfEachCharacterInString({a: 1})) // error
} catch (e) {
    console.log(e)
}

try {
    console.log(utils.countOfEachCharacterInString(str1)) // { c: 3, o: 1, u: 1, n: 3, t: 3, O: 1, f: 1, E: 1, a: 3, h: 2, C: 1, r: 3, e: 1, I: 1, S: 1, i: 1, g: 1 }
} catch (e) {
    console.log(e)
}

try {
    console.log(utils.countOfEachCharacterInString(str2)) // { V: 1, i: 2, s: 1, u: 2, a: 1, l: 1, ' ': 2, S: 1, t: 1, d: 2, o: 2, C: 1, e: 1 }
} catch (e) {
    console.log(e)
}

try {
    console.log(utils.countOfEachCharacterInString(str3)) // { C: 1, h: 2, o: 2, c: 2, l: 1, a: 1, t: 1, e: 1, ' ': 2, i: 2, p: 1, m: 1, u: 1, f: 2, n: 1 }
} catch (e) {
    console.log(e)
}
