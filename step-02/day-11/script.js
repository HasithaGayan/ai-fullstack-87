
"use strict";

// ========================================
// DAY 11 - JAVASCRIPT FUNDAMENTALS
// ========================================

// 1. Variables: let and const
const developerName = "Hasitha";
let learningDay = 11;

console.log("Hello, JavaScript!");
console.log("My name is " + developerName);
console.log("I am learning Day " + learningDay);

learningDay = 12;
console.log("Next learning day:", learningDay);


// 2. JavaScript data types
console.log("----- JavaScript Data Types -----");

const studentName = "Hasitha";
const studentAge = 22;
const isLearning = true;
const futureJob = null;
let projectName;

console.log(typeof studentName);
console.log(typeof studentAge);
console.log(typeof isLearning);
console.log(typeof futureJob);
console.log(typeof projectName);


// 3. Template literals
console.log("----- Template Literals -----");

console.log(`My name is ${studentName} and I am ${studentAge} years old.`);


// 4. Arithmetic operators
console.log("----- Arithmetic Operators -----");

const numberA = 12;
const numberB = 3;

console.log("Addition:", numberA + numberB);
console.log("Subtraction:", numberA - numberB);
console.log("Multiplication:", numberA * numberB);
console.log("Division:", numberA / numberB);


// 5. Remainder and exponent
console.log("----- Remainder and Exponent -----");

console.log("Remainder:", 17 % 5);
console.log("Exponent:", 2 ** 3);


// 6. Comparison operators
console.log("----- Comparison Operators -----");

console.log("Greater than:", 10 > 5);
console.log("Less than:", 10 < 5);
console.log("Strictly equal:", 10 === 10);
console.log("Different types:", 5 === "5");
console.log("Not equal:", 10 !== 5);


// 7. Logical operators
console.log("----- Logical Operators -----");

const hasEmail = true;
const hasPassword = false;

console.log("AND:", hasEmail && hasPassword);
console.log("OR:", hasEmail || hasPassword);
console.log("NOT:", !hasEmail);
console.log("Both true:", true && true);
console.log("Both false:", false || false);


// 8. Type conversion
console.log("----- Type Conversion -----");

const textNumber = "25";
const convertedNumber = Number(textNumber);

console.log("Original type:", typeof textNumber);
console.log("Converted type:", typeof convertedNumber);

console.log("Without conversion:", "25" + 5);
console.log("With conversion:", Number("25") + 5);

console.log("Number to string:", String(100));
console.log("Invalid conversion:", Number("hello"));


// ========================================
// 20 JAVASCRIPT EXERCISES
// ========================================

// Exercise 1: Temperature converter
console.log("----- Exercise 1: Temperature Converter -----");

const celsius = 30;
const fahrenheit = (celsius * 9 / 5) + 32;

console.log(`${celsius}°C = ${fahrenheit}°F`);


// Exercise 2: Rectangle area
console.log("----- Exercise 2: Rectangle Area -----");

const width = 8;
const height = 5;

const area = width * height;

console.log(`Rectangle area: ${area}`);


// Exercise 3: Shopping discount
console.log("----- Exercise 3: Shopping Discount -----");

const originalPrice = 2000;
const discountPercent = 15;

const discountAmount = (originalPrice * discountPercent) / 100;
const finalPrice = originalPrice - discountAmount;

console.log(`Discount: Rs. ${discountAmount}`);
console.log(`Final price: Rs. ${finalPrice}`);


// Exercise 4: Average calculator
console.log("----- Exercise 4: Average Calculator -----");

const mark1 = 75;
const mark2 = 85;
const mark3 = 90;

const average = (mark1 + mark2 + mark3) / 3;

console.log(`Average mark: ${average.toFixed(2)}`);


// Exercise 5: Time converter
console.log("----- Exercise 5: Time Converter -----");

const totalMinutes = 135;

const hours = Math.floor(totalMinutes / 60);
const remainingMinutes = totalMinutes % 60;

console.log(`${totalMinutes} minutes = ${hours} hours and ${remainingMinutes} minutes`);


// Exercise 6: Full name formatter
console.log("----- Exercise 6: Full Name Formatter -----");

const firstName = "Hasitha";
const lastName = "Gayan";

const fullName = `${firstName} ${lastName}`;

console.log(`Full name: ${fullName}`);
console.log(`Uppercase name: ${fullName.toUpperCase()}`);


// Exercise 7: Even or odd
console.log("----- Exercise 7: Even or Odd -----");

const checkNumber = 7;

console.log("Is even:", checkNumber % 2 === 0);
console.log("Is odd:", checkNumber % 2 !== 0);


// Exercise 8: Larger number
console.log("----- Exercise 8: Larger Number -----");

const firstNumber = 45;
const secondNumber = 72;

const largerNumber = firstNumber > secondNumber
  ? firstNumber
  : secondNumber;

console.log(`Larger number: ${largerNumber}`);


// Exercise 9: Price including tax
console.log("----- Exercise 9: Price Including Tax -----");

const productPrice = 1500;
const taxRate = 10;

const taxAmount = (productPrice * taxRate) / 100;
const totalPrice = productPrice + taxAmount;

console.log(`Tax amount: Rs. ${taxAmount}`);
console.log(`Total price: Rs. ${totalPrice}`);


// Exercise 10: Simple interest
console.log("----- Exercise 10: Simple Interest -----");

const principal = 10000;
const annualRate = 5;
const years = 2;

const simpleInterest = (principal * annualRate * years) / 100;
const finalAmount = principal + simpleInterest;

console.log(`Interest earned: Rs. ${simpleInterest}`);
console.log(`Final amount: Rs. ${finalAmount}`);


// Exercise 11: BMI calculator
console.log("----- Exercise 11: BMI Calculator -----");

const weightKg = 70;
const heightMeters = 1.75;

const bmi = weightKg / (heightMeters ** 2);

console.log(`BMI: ${bmi.toFixed(2)}`);


// Exercise 12: Student percentage
console.log("----- Exercise 12: Student Percentage -----");

const obtainedMarks = 425;
const totalMarks = 500;

const percentage = (obtainedMarks / totalMarks) * 100;

console.log(`Student percentage: ${percentage.toFixed(2)}%`);


// Exercise 13: Kilometers to miles
console.log("----- Exercise 13: Kilometer to Mile Converter -----");

const kilometers = 10;
const miles = kilometers * 0.621371;

console.log(`${kilometers} km = ${miles.toFixed(2)} miles`);


// Exercise 14: Rectangle perimeter
console.log("----- Exercise 14: Rectangle Perimeter -----");

const perimeterWidth = 12;
const perimeterHeight = 7;

const perimeter = 2 * (perimeterWidth + perimeterHeight);

console.log(`Rectangle perimeter: ${perimeter} meters`);


// Exercise 15: Circle area
console.log("----- Exercise 15: Circle Area -----");

const circleRadius = 7;
const circleArea = Math.PI * (circleRadius ** 2);

console.log(`Circle area: ${circleArea.toFixed(2)} square units`);


// Exercise 16: Seconds converter
console.log("----- Exercise 16: Seconds Converter -----");

const totalSeconds = 145;

const completeMinutes = Math.floor(totalSeconds / 60);
const leftoverSeconds = totalSeconds % 60;

console.log(`${totalSeconds} seconds = ${completeMinutes} minutes and ${leftoverSeconds} seconds`);


// Exercise 17: Profit or loss
console.log("----- Exercise 17: Profit or Loss -----");

const costPrice = 1200;
const sellingPrice = 1500;

const difference = sellingPrice - costPrice;
const resultType = difference >= 0 ? "Profit" : "Loss";

console.log(`${resultType}: Rs. ${Math.abs(difference)}`);


// Exercise 18: Net salary
console.log("----- Exercise 18: Net Salary -----");

const grossSalary = 60000;
const deductionRate = 8;

const salaryDeduction = (grossSalary * deductionRate) / 100;
const netSalary = grossSalary - salaryDeduction;

console.log(`Deduction: Rs. ${salaryDeduction}`);
console.log(`Net salary: Rs. ${netSalary}`);


// Exercise 19: Shopping cart
console.log("----- Exercise 19: Shopping Cart -----");

const notebookPrice = 500;
const notebookQuantity = 2;

const penPrice = 100;
const penQuantity = 3;

const notebookTotal = notebookPrice * notebookQuantity;
const penTotal = penPrice * penQuantity;

const cartTotal = notebookTotal + penTotal;

console.log(`Notebook total: Rs. ${notebookTotal}`);
console.log(`Pen total: Rs. ${penTotal}`);
console.log(`Shopping cart total: Rs. ${cartTotal}`);


// Exercise 20: Days to weeks
console.log("----- Exercise 20: Days to Weeks Converter -----");

const totalDays = 17;

const completeWeeks = Math.floor(totalDays / 7);
const leftoverDays = totalDays % 7;

console.log(`${totalDays} days = ${completeWeeks} weeks and ${leftoverDays} days`);


// ========================================
// FINAL PROJECT: CONSOLE CALCULATOR
// ========================================

console.log("----- Console Calculator -----");

// STEP 40: Test valid addition (20 + 5).
// Change these three values for future tests.




const calculatorInput1 = "20";
const calculatorInput2 = "5";
const calculatorOperator = "/";





// Explicitly convert strings into numbers.
const calculatorNumber1 = Number(calculatorInput1);
const calculatorNumber2 = Number(calculatorInput2);

// First, check for invalid number inputs.
if (
  calculatorInput1.trim() === "" ||
  calculatorInput2.trim() === "" ||
  !Number.isFinite(calculatorNumber1) ||
  !Number.isFinite(calculatorNumber2)
) {
  console.log("Error: Please enter valid numbers.");

// Addition
} else if (calculatorOperator === "+") {
  console.log("Result:", calculatorNumber1 + calculatorNumber2);

// Subtraction
} else if (calculatorOperator === "-") {
  console.log("Result:", calculatorNumber1 - calculatorNumber2);

// Multiplication
} else if (calculatorOperator === "*") {
  console.log("Result:", calculatorNumber1 * calculatorNumber2);

// Division
} else if (calculatorOperator === "/") {
  if (calculatorNumber2 === 0) {
    console.log("Error: Cannot divide by zero.");
  } else {
    console.log("Result:", calculatorNumber1 / calculatorNumber2);
  }

// Invalid operator
} else {
  console.log("Error: Invalid operator.");
}
