let a = 10;
let b = 25;
let c = 18;

let largest;
if (a > b && a > c) {
    largest = a;
} else if (b > a && b > c) {
    largest = b;
} else {
    largest = c;
}
console.log("Largest number is:", largest);


let num1 = -5;
if (num1 > 0) {
    console.log("Positive");
} else if (num1 < 0) {
    console.log("Negative");
} else {
    console.log("Zero");
}


let correctUsername = "admin";
let correctPassword = "1234";
let username = "admin";
let password = "1234";

if (username === correctUsername && password === correctPassword) {
    console.log("Login Successful");
} else {
    console.log("Invalid Credentials");
}


let units = 250;
let bill = 0;

if (units <= 100) {
    bill = units * 10;
} else if (units <= 200) {
    bill = (100 * 10) + ((units - 100) * 15);
} else {
    bill = (100 * 10) + (100 * 15) + ((units - 200) * 20);
}
console.log("Total Bill:", bill);


for (let i = 1; i <= 50; i++) {
    if (i % 2 === 0) {
        console.log(i);
    }
}


for (let i = 20; i >= 1; i--) {
    console.log(i);
}


let number = 5;
let factorial = 1;
for (let i = 1; i <= number; i++) {
    factorial *= i;
}
console.log("Factorial is:", factorial);


let num2 = 12345;
let count = 0;
let temp = num2;

while (temp !== 0) {
    temp = Math.floor(temp / 10);
    count++;
}
console.log("Total digits:", count);


let sum = 0;
for (let i = 1; i <= 100; i++) {
    if (i % 2 === 0) {
        sum += i;
    }
}
console.log("Sum of even numbers:", sum);


let num3 = 7;
let isPrime = true;

if (num3 <= 1) {
    isPrime = false;
}

for (let i = 2; i < num3; i++) {
    if (num3 % i === 0) {
        isPrime = false;
        break;
    }
}

if (isPrime) {
    console.log("Prime Number");
} else {
    console.log("Not Prime");
}


let balance = 5000;
let withdraw = 2000;

if (withdraw <= balance) {
    balance -= withdraw;
    console.log("Withdrawal Successful");
    console.log("Remaining Balance:", balance);
} else {
    console.log("Insufficient balance");
}


let pass = "Abc12345";
let hasNumber = /\d/.test(pass);
let hasUppercase = /[A-Z]/.test(pass);
let longEnough = pass.length >= 8;

if (hasNumber && hasUppercase && longEnough) {
    console.log("Strong Password");
} else {
    console.log("Weak Password");
}


for (let i = 1; i <= 50; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
        console.log("FizzBuzz");
    } else if (i % 3 === 0) {
        console.log("Fizz");
    } else if (i % 5 === 0) {
        console.log("Buzz");
    } else {
        console.log(i);
    }
}


//Assignment01

let name = "Hassan";
let age = 20;
let isStudent = true;

console.log("My name is " + name + ". I am " + age + " years old. Student: " + isStudent);


let str = "Hello";
let num = 25;
let bool = false;
let undef;
let nul = null;

console.log(typeof str);
console.log(typeof num);
console.log(typeof bool);
console.log(typeof undef);
console.log(typeof nul);


let numone = 10;
let numtwo = 5;

console.log("Addition:", numone + numtwo);
console.log("Subtraction:", numone - numtwo);
console.log("Multiplication:", numone * numtwo);
console.log("Division:", numone / numtwo);


let celsius = 30;
let fahrenheit = (celsius * 9/5) + 32;

console.log("Celsius:", celsius);
console.log("Fahrenheit:", fahrenheit);


let number_checker = 7;

if (number_checker % 2 === 0) {
    console.log("Even");
} else {
    console.log("Odd");
}


let marks = 85;
let grade;

if (marks >= 90) {
    grade = "A";
} else if (marks >= 80) {
    grade = "B";
} else if (marks >= 70) {
    grade = "C";
} else if (marks >= 60) {
    grade = "D";
} else {
    grade = "Fail";
}

console.log("Grade:", grade);


let personAge = 17;

if (personAge >= 18) {
    console.log("You can vote");
} else {
    console.log("You cannot vote");
}


for (let i = 1; i <= 10; i++) {
    console.log(i);
}


let tableNumber = 5;

for (let i = 1; i <= 10; i++) {
    console.log(tableNumber + " x " + i + " = " + (tableNumber * i));
}