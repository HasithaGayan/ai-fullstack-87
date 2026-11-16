
console.log("----- Day 13: JavaScript Functions -----");

function sayHello() {
  console.log("Hello! Welcome to Day 13.");
}

sayHello();
sayHello();



console.log("----- Function Parameters -----");

function greetDeveloper(name) {
  console.log(`Hello, ${name}!`);
}

greetDeveloper("Hasitha");
greetDeveloper("Alex");
greetDeveloper("Gayan");




console.log("----- Function Return Values -----");

function addNumbers(a, b) {
  return a + b;
}

const result1 = addNumbers(10, 5);
const result2 = addNumbers(20, 30);

console.log("First result:", result1);
console.log("Second result:", result2);




console.log("----- Multiplication Function -----");

function multiplyNumbers(a, b) {
  return a * b;
}

const multiplicationResult1 = multiplyNumbers(4, 5);
const multiplicationResult2 = multiplyNumbers(6, 7);

console.log("First multiplication:", multiplicationResult1);
console.log("Second multiplication:", multiplicationResult2);





console.log("----- Function Expressions and Arrow Functions -----");

// Function expression
const subtractNumbers = function(a, b) {
  return a - b;
};

// Arrow function
const divideNumbers = (a, b) => {
  return a / b;
};

console.log("Subtraction:", subtractNumbers(20, 5));
console.log("Division:", divideNumbers(20, 5));






console.log("----- Default Parameters and Safe Division -----");

function greetUser(name = "Developer") {
  return `Hello, ${name}!`;
}

console.log(greetUser());
console.log(greetUser("Alex"));

function safeDivide(a, b = 1) {
  if (b === 0) {
    return "Error: Cannot divide by zero.";
  }

  return a / b;
}

console.log("Normal division:", safeDivide(20, 5));
console.log("Default divisor:", safeDivide(20));
console.log("Zero divisor:", safeDivide(20, 0));






console.log("----- Default Parameters and Safe Division -----");

function greetUser(name = "Developer") {
  return `Hello, ${name}!`;
}

console.log(greetUser());
console.log(greetUser("Alex"));

function safeDivide(a, b = 1) {
  if (b === 0) {
    return "Error: Cannot divide by zero.";
  }

  return a / b;
}

console.log("Normal division:", safeDivide(20, 5));
console.log("Default divisor:", safeDivide(20));
console.log("Zero divisor:", safeDivide(20, 0));





console.log("----- JavaScript Scope -----");

// Global scope
const courseName = "AI Full-Stack Development";

function showCourse() {
  // Function scope
  const lessonName = "JavaScript Functions";

  console.log("Course:", courseName);
  console.log("Lesson:", lessonName);
}

showCourse();

// Block scope
if (true) {
  const secretMessage = "Inside the block";
  console.log(secretMessage);
}

console.log("Scope practice finished!");




console.log("----- JavaScript Closures -----");

function createCounter() {
  let count = 0;

  function increase() {
    count++;
    return count;
  }

  return increase;
}

const counter = createCounter();

console.log("Counter:", counter());
console.log("Counter:", counter());
console.log("Counter:", counter());




console.log("----- Independent Closures -----");

const counterA = createCounter();
const counterB = createCounter();

console.log("A:", counterA());
console.log("A:", counterA());
console.log("B:", counterB());
console.log("A:", counterA());
console.log("B:", counterB());





console.log("----- Refactoring: Positive or Negative -----");

function checkNumber(number) {
  if (number > 0) {
    return "Positive";
  } else if (number < 0) {
    return "Negative";
  } else {
    return "Zero";
  }
}

console.log("10:", checkNumber(10));
console.log("-5:", checkNumber(-5));
console.log("0:", checkNumber(0));






console.log("----- Refactoring: Student Grades -----");

function calculateGrade(score) {
  if (typeof score !== "number" || !Number.isFinite(score) ||
      score < 0 || score > 100) {
    return "Invalid score";
  }

  if (score >= 90) {
    return "A";
  } else if (score >= 80) {
    return "B";
  } else if (score >= 70) {
    return "C";
  } else if (score >= 60) {
    return "D";
  } else {
    return "F";
  }
}

console.log("92:", calculateGrade(92));
console.log("75:", calculateGrade(75));
console.log("45:", calculateGrade(45));
console.log("105:", calculateGrade(105));





console.log("----- Refactoring: Leap Year -----");

function isLeapYear(year) {
  if (!Number.isInteger(year) || year < 1) {
    return false;
  }

  return year % 400 === 0 ||
         (year % 4 === 0 && year % 100 !== 0);
}

console.log("2024:", isLeapYear(2024));
console.log("2025:", isLeapYear(2025));
console.log("1900:", isLeapYear(1900));
console.log("2000:", isLeapYear(2000));





console.log("----- Refactoring: Sum of Numbers -----");

function sumUpTo(limit) {
  if (!Number.isInteger(limit) || limit < 1) {
    return "Invalid limit";
  }

  let total = 0;

  for (let number = 1; number <= limit; number++) {
    total += number;
  }

  return total;
}

console.log("Sum to 5:", sumUpTo(5));
console.log("Sum to 10:", sumUpTo(10));
console.log("Invalid:", sumUpTo(-3));






console.log("----- Refactoring: Count Even Numbers -----");

function countEvenNumbers(limit) {
  if (!Number.isInteger(limit) || limit < 1) {
    return "Invalid limit";
  }

  let count = 0;

  for (let number = 1; number <= limit; number++) {
    if (number % 2 === 0) {
      count++;
    }
  }

  return count;
}

console.log("Up to 10:", countEvenNumbers(10));
console.log("Up to 7:", countEvenNumbers(7));
console.log("Invalid:", countEvenNumbers(-5));






console.log("----- Refactoring: Factorial -----");

function calculateFactorial(number) {
  if (!Number.isInteger(number) || number < 0 || number > 170) {
    return "Invalid number";
  }

  let result = 1;

  for (let i = 2; i <= number; i++) {
    result *= i;
  }

  return result;
}

console.log("5!:", calculateFactorial(5));
console.log("3!:", calculateFactorial(3));
console.log("0!:", calculateFactorial(0));
console.log("Invalid:", calculateFactorial(-2));








console.log("----- Refactoring: FizzBuzz -----");

function fizzBuzz(number) {
  if (!Number.isInteger(number)) {
    return "Invalid number";
  }

  if (number % 3 === 0 && number % 5 === 0) {
    return "FizzBuzz";
  } else if (number % 3 === 0) {
    return "Fizz";
  } else if (number % 5 === 0) {
    return "Buzz";
  } else {
    return number;
  }
}

console.log("3:", fizzBuzz(3));
console.log("5:", fizzBuzz(5));
console.log("15:", fizzBuzz(15));
console.log("7:", fizzBuzz(7));






console.log("----- Refactoring: Prime Numbers -----");

function isPrime(number) {
  if (!Number.isSafeInteger(number) || number < 2) {
    return false;
  }

  for (let divisor = 2; divisor <= Math.sqrt(number); divisor++) {
    if (number % divisor === 0) {
      return false;
    }
  }

  return true;
}

console.log("2:", isPrime(2));
console.log("7:", isPrime(7));
console.log("9:", isPrime(9));
console.log("1:", isPrime(1));
console.log("17:", isPrime(17));







console.log("----- Day 13: Final Function Tests -----");

const functionTests = [
  ["Positive/Negative", checkNumber(-5) === "Negative"],
  ["Student Grade", calculateGrade(92) === "A"],
  ["Leap Year", isLeapYear(2000) === true],
  ["Sum of Numbers", sumUpTo(10) === 55],
  ["Even Number Counter", countEvenNumbers(12) === 6],
  ["Factorial", calculateFactorial(5) === 120],
  ["FizzBuzz", fizzBuzz(30) === "FizzBuzz"],
  ["Prime Number", isPrime(21) === false]
];

functionTests.forEach(([name, passed]) => {
  console.log(`${name}: ${passed ? "PASS ✅" : "FAIL ❌"}`);
});




console.log("----- Independent Challenge: Sum Even Numbers -----");

function sumEvenUpTo(limit) {
    if (!Number.isInteger(limit) || limit < 1) {
        return "Invalid limit";
    }

    let total = 0;

    for (let number = 1; number <= limit; number++) {
        if (number % 2 === 0) {
            total += number;
        }
    }

    return total;
}

console.log(sumEvenUpTo(6));
console.log(sumEvenUpTo(10));
console.log(sumEvenUpTo(1));
console.log(sumEvenUpTo(-2));