function getDayName(day) {
  switch (day) {
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    case 7:
      return "Sunday";
    default:
      return "Invalid day number";
  }
}

console.log("Day 3:", getDayName(3));
console.log("Day 8:", getDayName(8));

function printOneToTen() {
  let result = [];
  let i = 1;
  while (i <= 10) {
    result.push(i);
    i++;
  }
  console.log("1 to 10:", result.join(", "));
}

printOneToTen();

function printTenToOne() {
  let result = [];
  let i = 10;
  do {
    result.push(i);
    i--;
  } while (i >= 1);
  console.log("10 to 1:", result.join(", "));
}

printTenToOne();
