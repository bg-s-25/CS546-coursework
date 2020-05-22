/**
    Title  : CS 546 A - Lab 1
    Desc   : An Intro to Node
    Name   : Bobby Georgiou
    Date   : 02/04/2020
    Pledge : "I pledge my honor that I have abided by the Stevens Honor System."
 */

/* Calculates the sum of squares of all the numbers in the array arr and returns the result */
const questionOne = function questionOne(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; ++i) {
        sum += arr[i] * arr[i];
    }
    return sum;
}

/* Returns the Fibonacci number that corresponds to the index num */
const questionTwo = function questionTwo(num) {
    if (num < 1) {
        return 0;
    } else if (num == 1) {
        return 1;
    } else {
        return questionTwo(num - 1) + questionTwo(num - 2);
    }
}

/* Counts the number of vowels in the string text and returns the result */
const questionThree = function questionThree(text) {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    let vowelCnt = 0;
    for (let i = 0; i < text.length; ++i) {
        if (vowels.indexOf(text[i].toLowerCase()) >= 0) vowelCnt++;
    }
    return vowelCnt;
}

/* Calculates the factorial of the number num and returns the result */
const questionFour = function questionFour(num) {
    if (num < 0) {
        return NaN;
    } else if (num == 0) {
        return 1;
    }
    let fact = 1;
    for (let i = num; i > 0; --i) {
        fact *= i;
    }
    return fact;
}

module.exports = {
    firstName: "Bobby",
    lastName: "Georgiou", 
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};
