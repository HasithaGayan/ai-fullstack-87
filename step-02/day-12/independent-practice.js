
"use strict";

// ==========================================
// DAY 12 - CONTROL FLOW PRACTICE
// 10 GUIDED JAVASCRIPT EXERCISES
// ==========================================

console.log("===== DAY 12 PRACTICE STARTED =====");


// EXERCISE 1: Positive, Negative, or Zero
console.log("----- Exercise 1: Number Type -----");

{
  const testNumber = -7;

  if (testNumber > 0) {
    console.log("Positive");
  } else if (testNumber < 0) {
    console.log("Negative");
  } else {
    console.log("Zero");
  }
}


// EXERCISE 2: Student Grading
console.log("----- Exercise 2: Student Grading -----");

{
  const marks = 85;

  if (!Number.isFinite(marks) || marks < 0 || marks > 100) {
    console.log("Invalid marks");
  } else if (marks >= 90) {
    console.log("Grade A");
  } else if (marks >= 75) {
    console.log("Grade B");
  } else if (marks >= 50) {
    console.log("Grade C");
  } else {
    console.log("Grade F");
  }

  // Edge case: scores above 100 are invalid.
  const invalidMarks = 105;

  if (invalidMarks < 0 || invalidMarks > 100) {
    console.log("105: Invalid marks");
  }
}


// EXERCISE 3: Leap Year Checker
console.log("----- Exercise 3: Leap Year -----");

{
  const years = [2024, 1900, 2000];

  for (const year of years) {
    const isLeapYear =
      year % 400 === 0 ||
      (year % 4 === 0 && year % 100 !== 0);

    console.log(
      `${year}: ${isLeapYear ? "Leap year" : "Not a leap year"}`
    );
  }
}


// EXERCISE 4: Sum of Numbers 1 to 10
console.log("----- Exercise 4: Sum 1 to 10 -----");

{
  let total = 0;

  for (let i = 1; i <= 10; i++) {
    total += i;
  }

  console.log("Total:", total);
}


// EXERCISE 5: Print Even Numbers
console.log("----- Exercise 5: Even Numbers -----");

{
  for (let i = 2; i <= 10; i += 2) {
    console.log(i);
  }
}


// EXERCISE 6: Factorial Calculator
console.log("----- Exercise 6: Factorial -----");

{
  const number = 5;
  let factorial = 1;

  for (let i = 1; i <= number; i++) {
    factorial *= i;
  }

  console.log("Factorial:", factorial);
}


// EXERCISE 7: FizzBuzz
console.log("----- Exercise 7: FizzBuzz -----");

{
  for (let i = 1; i <= 15; i++) {
    if (i % 15 === 0) {
      console.log("FizzBuzz");
    } else if (i % 3 === 0) {
      console.log("Fizz");
    } else if (i % 5 === 0) {
      console.log("Buzz");
    } else {
      console.log(i);
    }
  }
}


// EXERCISE 8: Find the Largest Number
console.log("----- Exercise 8: Largest Number -----");

{
  const numbers = [12, 45, 7, 89, 23];

  let largest = numbers[0];

  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > largest) {
      largest = numbers[i];
    }
  }

  console.log("Largest:", largest);
}


// EXERCISE 9: While Loop Countdown
console.log("----- Exercise 9: Countdown -----");

{
  let count = 5;

  while (count >= 1) {
    console.log(count);
    count--;
  }

  console.log("Go!");
}


// EXERCISE 10: Prime Number Checker
console.log("----- Exercise 10: Prime Number -----");

{
  const number = 29;

  let isPrime = Number.isInteger(number) && number >= 2;

  if (isPrime) {
    for (let i = 2; i * i <= number; i++) {
      if (number % i === 0) {
        isPrime = false;
        break;
      }
    }
  }

  console.log(
    `${number}: ${isPrime ? "Prime" : "Not prime"}`
  );

  // Edge case: 1 is not prime.
  const edgeCaseNumber = 1;

  console.log(
    `${edgeCaseNumber}: ${
      edgeCaseNumber < 2 ? "Not prime" : "Check required"
    }`
  );
}


// ==========================================
// FINAL MESSAGE
// ==========================================

console.log("==================================");
console.log("DAY 12 - ALL 10 EXAMPLES FINISHED");
console.log("==================================");
