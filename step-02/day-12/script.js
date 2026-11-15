
"use strict";

// ========================================
// DAY 12 - JAVASCRIPT CONDITIONS AND LOOPS
// ========================================

console.log("===== DAY 12: CONDITIONS AND LOOPS =====");


// ========================================
// PART 1: CONDITIONS
// ========================================

// 1. if / else
console.log("----- If / Else Practice -----");

const age = 20;

if (age >= 18) {
  console.log("You are an adult.");
} else {
  console.log("You are under 18.");
}


// 2. else if
console.log("----- Student Grading System -----");

const studentMarks = 85;

if (studentMarks < 0 || studentMarks > 100) {
  console.log("Invalid marks");
} else if (studentMarks >= 90) {
  console.log("Grade: A");
} else if (studentMarks >= 75) {
  console.log("Grade: B");
} else if (studentMarks >= 50) {
  console.log("Grade: C");
} else {
  console.log("Grade: F");
}


// 3. switch
console.log("----- Traffic Light Switch -----");

const trafficLight = "green";

switch (trafficLight) {
  case "red":
    console.log("Stop");
    break;

  case "yellow":
    console.log("Get ready");
    break;

  case "green":
    console.log("Go");
    break;

  default:
    console.log("Unknown traffic light");
}


// 4. Ternary operator
console.log("----- Ternary Operator -----");

const temperature = 32;

const weatherMessage =
  temperature >= 30 ? "Hot weather" : "Cool weather";

console.log(weatherMessage);


// ========================================
// PART 2: LOOPS
// ========================================

// 5. for loop
console.log("----- For Loop Practice -----");

for (let count = 1; count <= 10; count++) {
  console.log("Count:", count);
}


// 6. while loop
console.log("----- While Loop Practice -----");

let whileCount = 1;

while (whileCount <= 5) {
  console.log("While count:", whileCount);
  whileCount++;
}


// 7. break statement
console.log("----- Break Practice -----");

for (let number = 1; number <= 10; number++) {
  if (number === 6) {
    break;
  }

  console.log("Number:", number);
}


// 8. continue statement
console.log("----- Continue Practice -----");

for (let number = 1; number <= 10; number++) {
  if (number === 5) {
    continue;
  }

  console.log("Number:", number);
}


// ========================================
// PART 3: 20 CONTROL-FLOW EXERCISES
// ========================================


// EXERCISE 1: Student grading
console.log("----- Exercise 1: Student Grade -----");

const gradeScore = 92;

if (
  !Number.isFinite(gradeScore) ||
  gradeScore < 0 ||
  gradeScore > 100
) {
  console.log("Invalid score");
} else if (gradeScore >= 90) {
  console.log("Grade A");
} else if (gradeScore >= 75) {
  console.log("Grade B");
} else if (gradeScore >= 50) {
  console.log("Grade C");
} else {
  console.log("Grade F");
}

// Edge-case check
const invalidScore = 105;

console.log(
  "Score 105 valid?",
  invalidScore >= 0 && invalidScore <= 100
);


// EXERCISE 2: Leap year checker
console.log("----- Exercise 2: Leap Year Checker -----");

const yearsToCheck = [2024, 1900, 2000];

for (const year of yearsToCheck) {
  const isLeapYear =
    year % 400 === 0 ||
    (year % 4 === 0 && year % 100 !== 0);

  console.log(
    `${year}: ${isLeapYear ? "Leap year" : "Not a leap year"}`
  );
}


// EXERCISE 3: FizzBuzz
console.log("----- Exercise 3: FizzBuzz -----");

for (let number = 1; number <= 20; number++) {
  if (number % 15 === 0) {
    console.log("FizzBuzz");
  } else if (number % 3 === 0) {
    console.log("Fizz");
  } else if (number % 5 === 0) {
    console.log("Buzz");
  } else {
    console.log(number);
  }
}


// EXERCISE 4: Print numbers 1 to 10
console.log("----- Exercise 4: Numbers 1 to 10 -----");

let numberRange = "";

for (let number = 1; number <= 10; number++) {
  numberRange += `${number} `;
}

console.log(numberRange.trim());


// EXERCISE 5: Even numbers
console.log("----- Exercise 5: Even Numbers -----");

let evenNumbers = "";

for (let number = 1; number <= 20; number++) {
  if (number % 2 === 0) {
    evenNumbers += `${number} `;
  }
}

console.log(evenNumbers.trim());


// EXERCISE 6: Odd numbers
console.log("----- Exercise 6: Odd Numbers -----");

let oddNumbers = "";

for (let number = 1; number <= 20; number++) {
  if (number % 2 !== 0) {
    oddNumbers += `${number} `;
  }
}

console.log(oddNumbers.trim());


// EXERCISE 7: Sum numbers from 1 to 10
console.log("----- Exercise 7: Sum of Numbers -----");

let sum = 0;

for (let number = 1; number <= 10; number++) {
  sum += number;
}

console.log("Sum:", sum);


// EXERCISE 8: Multiplication table
console.log("----- Exercise 8: Multiplication Table -----");

const tableNumber = 7;

for (let multiplier = 1; multiplier <= 10; multiplier++) {
  console.log(
    `${tableNumber} x ${multiplier} = ${tableNumber * multiplier}`
  );
}


// EXERCISE 9: Countdown
console.log("----- Exercise 9: Countdown -----");

let countdown = 5;

while (countdown >= 1) {
  console.log(countdown);
  countdown--;
}

console.log("Go!");


// EXERCISE 10: Factorial
console.log("----- Exercise 10: Factorial -----");

const factorialNumber = 5;

let factorialResult = 1;
let factorialCounter = 1;

while (factorialCounter <= factorialNumber) {
  factorialResult *= factorialCounter;
  factorialCounter++;
}

console.log(`Factorial of ${factorialNumber}: ${factorialResult}`);


// EXERCISE 11: Count multiples of 3
console.log("----- Exercise 11: Multiples of 3 -----");

let multiplesOfThreeCount = 0;

for (let number = 1; number <= 30; number++) {
  if (number % 3 === 0) {
    multiplesOfThreeCount++;
  }
}

console.log("Count:", multiplesOfThreeCount);


// EXERCISE 12: Find largest number
console.log("----- Exercise 12: Largest Number -----");

const comparisonNumbers = [12, 45, 7, 89, 23];

let largestNumber = comparisonNumbers[0];

for (let index = 1; index < comparisonNumbers.length; index++) {
  if (comparisonNumbers[index] > largestNumber) {
    largestNumber = comparisonNumbers[index];
  }
}

console.log("Largest number:", largestNumber);


// EXERCISE 13: Find smallest number
console.log("----- Exercise 13: Smallest Number -----");

let smallestNumber = comparisonNumbers[0];

for (let index = 1; index < comparisonNumbers.length; index++) {
  if (comparisonNumbers[index] < smallestNumber) {
    smallestNumber = comparisonNumbers[index];
  }
}

console.log("Smallest number:", smallestNumber);


// EXERCISE 14: Count positive, negative and zero
console.log("----- Exercise 14: Number Categories -----");

const categoryNumbers = [-3, 0, 7, -1, 5, 0];

let positiveCount = 0;
let negativeCount = 0;
let zeroCount = 0;

for (const number of categoryNumbers) {
  if (number > 0) {
    positiveCount++;
  } else if (number < 0) {
    negativeCount++;
  } else {
    zeroCount++;
  }
}

console.log("Positive:", positiveCount);
console.log("Negative:", negativeCount);
console.log("Zero:", zeroCount);


// EXERCISE 15: Day of the week
console.log("----- Exercise 15: Day of Week -----");

const dayNumber = 3;

switch (dayNumber) {
  case 1:
    console.log("Monday");
    break;

  case 2:
    console.log("Tuesday");
    break;

  case 3:
    console.log("Wednesday");
    break;

  case 4:
    console.log("Thursday");
    break;

  case 5:
    console.log("Friday");
    break;

  case 6:
    console.log("Saturday");
    break;

  case 7:
    console.log("Sunday");
    break;

  default:
    console.log("Invalid day number");
}


// EXERCISE 16: Find a number using break
console.log("----- Exercise 16: Search with Break -----");

const searchNumbers = [4, 9, 15, 22, 30];
const searchTarget = 22;

let foundIndex = -1;

for (let index = 0; index < searchNumbers.length; index++) {
  if (searchNumbers[index] === searchTarget) {
    foundIndex = index;
    break;
  }
}

if (foundIndex === -1) {
  console.log("Number not found");
} else {
  console.log(`Found ${searchTarget} at index ${foundIndex}`);
}


// EXERCISE 17: Skip multiples of 4
console.log("----- Exercise 17: Continue Statement -----");

let skippedNumbersOutput = "";

for (let number = 1; number <= 15; number++) {
  if (number % 4 === 0) {
    continue;
  }

  skippedNumbersOutput += `${number} `;
}

console.log(skippedNumbersOutput.trim());


// EXERCISE 18: Sum of squares
console.log("----- Exercise 18: Sum of Squares -----");

let squareSum = 0;

for (let number = 1; number <= 5; number++) {
  squareSum += number ** 2;
}

console.log("Sum of squares:", squareSum);


// EXERCISE 19: Count vowels
console.log("----- Exercise 19: Count Vowels -----");

const wordToCheck = "JavaScript";

let vowelCount = 0;

for (const letter of wordToCheck.toLowerCase()) {
  if ("aeiou".includes(letter)) {
    vowelCount++;
  }
}

console.log("Word:", wordToCheck);
console.log("Vowels:", vowelCount);


// EXERCISE 20: Prime number checker
console.log("----- Exercise 20: Prime Number -----");

const primeCandidate = 29;

let isPrime = Number.isInteger(primeCandidate) &&
  primeCandidate >= 2;

if (isPrime) {
  for (
    let divisor = 2;
    divisor * divisor <= primeCandidate;
    divisor++
  ) {
    if (primeCandidate % divisor === 0) {
      isPrime = false;
      break;
    }
  }
}

console.log(
  `${primeCandidate} is ${isPrime ? "prime" : "not prime"}`
);


// ========================================
// PART 4: TWO LOOP-TRACING EXAMPLES
// ========================================

// TRACE 1: for loop
console.log("----- Trace 1: Running Total -----");

let traceTotal = 0;

for (let i = 1; i <= 3; i++) {
  traceTotal += i;

  console.log(`i = ${i}, total = ${traceTotal}`);
}


// TRACE 2: while loop
console.log("----- Trace 2: Halving a Number -----");

let traceValue = 8;

while (traceValue > 1) {
  traceValue = traceValue / 2;

  console.log("Current value:", traceValue);
}


// ========================================
// PART 5: CLEAR BOOLEAN CONDITIONS
// ========================================

// Instead of writing many deeply nested if statements,
// combine conditions into one readable boolean expression.

console.log("----- Refactoring: Clear Conditions -----");

const hasTicket = true;
const meetsAgeRequirement = true;
const eventIsOpen = true;

const canEnterEvent =
  hasTicket && meetsAgeRequirement && eventIsOpen;

if (canEnterEvent) {
  console.log("Entry allowed");
} else {
  console.log("Entry denied");
}


// ========================================
// FINAL MESSAGE
// ========================================

console.log("======================================");
console.log("DAY 12 CODE FINISHED RUNNING");
console.log("20 CONTROL-FLOW EXERCISES INCLUDED");
console.log("======================================");




console.log("----- My Own For Loop Practice -----");

for (let i = 2; i <= 10; i += 2) {
  console.log(i);
}


console.log("----- My Own For Loop Practice -----");

for (let i = 3; i <= 15; i += 3) {
  console.log(i);
}




let total = 0;

for (let i = 3; i <= 15; i += 3) {
    total += i;
}

console.log("Total: " + total);
