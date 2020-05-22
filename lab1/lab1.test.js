/**
    Title  : CS 546 A - Lab 1
    Desc   : An Intro to Node
    Name   : Bobby Georgiou
    Date   : 02/04/2020
    Pledge : "I pledge my honor that I have abided by the Stevens Honor System."
 */

const lab1 = require("./lab1");

// Tests for questionOne
console.log(lab1.questionOne([1, 2, 3])); // should output 14
console.log(lab1.questionOne([5, 7, 2])); // should output 78
console.log(lab1.questionOne([0, 0, 4])); // should output 16
console.log(lab1.questionOne([2, -5, -3])); // should output 38
console.log(lab1.questionOne([9, 8, 7])); // should output 194

// Tests for questionTwo
console.log(lab1.questionTwo(0)); // should output 0
console.log(lab1.questionTwo(1)); // should output 1
console.log(lab1.questionTwo(6)); // should output 8
console.log(lab1.questionTwo(7)); // should output 13
console.log(lab1.questionTwo(10)); // should output 55

// Tests for questionThree
console.log(lab1.questionThree("")); // should output 0
console.log(lab1.questionThree("abc123__def456")); // should output 2
console.log(lab1.questionThree("The quick brown fox jumps over the lazy dog")); // should output 11
console.log(lab1.questionThree("How much wood would a woodchuck chuck if a woodchuck could chuck wood?")); // should output 21
console.log(lab1.questionThree("Fuzzy Wuzzy was a bear. Fuzzy Wuzzy had no hair. Fuzzy Wuzzy wasn't fuzzy, was he?")); // should output 18

// Tests for questionFour
console.log(lab1.questionFour(-9)); // should output NaN
console.log(lab1.questionFour(0)); // should output 1
console.log(lab1.questionFour(5)); // should output 120
console.log(lab1.questionFour(7)); // should output 5040
console.log(lab1.questionFour(10)); // should output 3628800
