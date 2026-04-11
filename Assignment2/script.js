let name = "Zain";
let age = 23;
let isStudent = true;
console.log(`My name is ${name}. I am ${age} years old. Student: ${isStudent}`);

let myString = "Sample String";
let myNumber = 42;
let myBoolean = true;
let myUndefined;
let myNull = null;

console.log(typeof myString);
console.log(typeof myNumber);
console.log(typeof myBoolean);
console.log(typeof myUndefined);
console.log(typeof myNull);

let num1 = 10;
let num2 = 5;

console.log("Addition:", num1 + num2);
console.log("Subtraction:", num1 - num2);
console.log("Multiplication:", num1 * num2);
console.log("Division:", num1 / num2);

let celsius = 25;
let fahrenheit = (celsius * 9/5) + 32;

console.log("Celsius:", celsius);
console.log("Fahrenheit:", fahrenheit);

let number = 7;
if (number % 2 === 0) {
    console.log("Even");
} else {
    console.log("Odd");
}

let marks = 85;
if (marks >= 90) {
    console.log("A");
} else if (marks >= 80) {
    console.log("B");
} else if (marks >= 70) {
    console.log("C");
} else if (marks >= 60) {
    console.log("D");
} else {
    console.log("Fail");
}

let ageEligibility = 18;
if (ageEligibility >= 18) {
    console.log("You can vote");
} else {
    console.log("You cannot vote");
}

for (let i = 1; i <= 10; i++) {
    console.log(i);
}

let tableFor = 5;
for (let i = 1; i <= 10; i++) {
    console.log(`${tableFor} x ${i} = ${tableFor * i}`);
}