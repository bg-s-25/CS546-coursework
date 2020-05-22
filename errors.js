/* Do try/catch statement for a function that throws an error */

function div(num, den) {
    if (typeof num != 'number') throw "Error: Numerator must be a number"   
    if (typeof den != 'number') throw "Error: Denominator must be a number"  
    if (den === 0) throw "Error: Division by zero"
    return num/den
}

try {
    console.log(div(3, 0)) // if this fails, the next line is not reached
    console.log("Dead line")
} catch (e) {
    console.log(e) // log error thrown by function
}

module.exports = {div}