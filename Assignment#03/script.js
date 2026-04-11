let numbers = [1, 2, 3, 4, 5]; 

let sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log("Sum of the numbers:", sum);

numbers.push(6);
console.log("Array after adding a new number:", numbers);

numbers.shift();
console.log("Array after removing the first number:", numbers);

numbers.reverse();
console.log("Reversed array:", numbers);

console.log("Does the array contain 5?", numbers.includes(5));

let multiplied = numbers.map(x => x * 2);
console.log("New array with numbers multiplied by 2:", multiplied);

numbers.reverse();

let greaterThanThree = numbers.filter(x => x > 3);
console.log("Numbers greater than 3:", greaterThanThree);

let firstDivisibleBy2 = numbers.find(x => x % 2 === 0);
console.log("First number divisible by 2:", firstDivisibleBy2);
