/**
    Title  : CS 546 A - Lab 2
    Desc   : Modules and Error Checking
    Name   : Bobby Georgiou
    Date   : 02/11/2020
    Pledge : "I pledge my honor that I have abided by the Stevens Honor System."
 */

/* Error checking for geometry functions */
function checkInputNum(varName, val) {
    if (val == null) {
        throw `Error: ${varName} not provided`
    } else if (typeof val != 'number') {
        throw `Error: ${varName} argument "${val}" is not a number`
    } else if (val < 0) {
        throw `Error: ${varName} argument ${val} is not within proper bounds`
    }
}

/* Calculate and return the volume of a rectangular prism */
function volumeOfRectangularPrism(length, width, height) {
    checkInputNum("Length", length)
    checkInputNum("Width", width)
    checkInputNum("Height", height)
    return length * width * height
}

/* Calculate and return the surface area of a rectangular prism */
function surfaceAreaOfRectangularPrism(length, width, height) {
    checkInputNum("Length", length)
    checkInputNum("Width", width)
    checkInputNum("Height", height)
    return 2 * (length * width + height * width + length * height)
}

/* Calculate and return the volume of a sphere */
function volumeOfSphere(radius) {
    checkInputNum("Radius", radius)
    return (4/3) * Math.PI * Math.pow(radius, 3)
}

/* Calculate and return the surface area of a sphere */
function surfaceAreaOfSphere(radius) {
    checkInputNum("Radius", radius)
    return 4 * Math.PI * Math.pow(radius, 2)
}

module.exports = {volumeOfRectangularPrism, surfaceAreaOfRectangularPrism, volumeOfSphere, surfaceAreaOfSphere}
