
console.log("🚀 DAY 20 - COMPLETE JAVASCRIPT CHECKPOINT");
console.log("========================================");

// =====================================
// PROBLEM 1: STRING FORMATTING
// =====================================

function formatText(text) {
  return text.trim().toUpperCase();
}

console.log("\n✅ PROBLEM 1: STRING FORMATTING");

const message = "   full stack developer   ";

console.log(formatText(message));


// =====================================
// PROBLEM 2: FIND EVEN NUMBERS
// =====================================

function getEvenNumbers(numberArray) {

  return numberArray.filter(function(number) {
    return number % 2 === 0;
  });

}

console.log("\n✅ PROBLEM 2: EVEN NUMBERS");

const numbers = [3, 8, 12, 17, 24, 31];

console.log(getEvenNumbers(numbers));


// =====================================
// PROBLEM 3: FIND LARGEST NUMBER
// =====================================

function findLargestNumber(numberArray) {

  if (numberArray.length === 0) {
    return null;
  }

  let largest = numberArray[0];

  for (let i = 1; i < numberArray.length; i++) {

    if (numberArray[i] > largest) {
      largest = numberArray[i];
    }

  }

  return largest;
}

console.log("\n✅ PROBLEM 3: LARGEST NUMBER");

const scores = [100, 25, 500, 60, 300];

console.log(findLargestNumber(scores));


// =====================================
// PROBLEM 4: REMOVE DUPLICATES
// =====================================

function removeDuplicates(numberArray) {

  const uniqueSet = new Set(numberArray);

  return [...uniqueSet];

}

console.log("\n✅ PROBLEM 4: REMOVE DUPLICATES");

const repeatedNumbers = [
  5, 5, 10, 15, 10, 20, 20, 25
];

console.log(removeDuplicates(repeatedNumbers));


// =====================================
// PROBLEM 5: COUNT WORDS USING MAP
// =====================================

function countWords(wordArray) {

  const wordCounts = new Map();

  for (const word of wordArray) {

    const currentCount = wordCounts.get(word) || 0;

    wordCounts.set(word, currentCount + 1);

  }

  return wordCounts;
}

console.log("\n✅ PROBLEM 5: WORD COUNT");

const words = [
  "cat",
  "dog",
  "cat",
  "bird",
  "dog",
  "cat",
  "bird"
];

const wordResult = countWords(words);

for (const [word, count] of wordResult) {
  console.log(`${word}: ${count}`);
}


// =====================================
// PROBLEM 6: LINEAR SEARCH
// =====================================

function findCityIndex(cityArray, targetCity) {

  for (let i = 0; i < cityArray.length; i++) {

    if (cityArray[i] === targetCity) {
      return i;
    }

  }

  return -1;
}

console.log("\n✅ PROBLEM 6: LINEAR SEARCH");

const cities = [
  "Colombo",
  "Negombo",
  "Kandy",
  "Galle"
];

console.log("Galle index:", findCityIndex(cities, "Galle"));

console.log("Jaffna index:", findCityIndex(cities, "Jaffna"));


// =====================================
// PROBLEM 7: SUM USING REDUCE
// =====================================

function calculateTotal(priceArray) {

  return priceArray.reduce(function(sum, price) {
    return sum + price;
  }, 0);

}

console.log("\n✅ PROBLEM 7: CALCULATE TOTAL");

const prices = [25, 75, 100, 200, 50];

console.log("Total:", calculateTotal(prices));


// =====================================
// PROBLEM 8: COUNT VOWELS
// =====================================

function countVowels(text) {

  const vowels = "aeiou";

  let count = 0;

  for (const letter of text.toLowerCase()) {

    if (vowels.includes(letter)) {
      count++;
    }

  }

  return count;
}

console.log("\n✅ PROBLEM 8: COUNT VOWELS");

console.log("JavaScript:", countVowels("JavaScript"));


// =====================================
// PROBLEM 9: REVERSE A STRING
// =====================================

function reverseText(text) {

  return text.split("").reverse().join("");

}

console.log("\n✅ PROBLEM 9: REVERSE STRING");

console.log(reverseText("developer"));


// =====================================
// PROBLEM 10: FILTER PRODUCTS
// =====================================

const products = [
  {
    id: 1,
    name: "Mouse",
    price: 1200
  },
  {
    id: 2,
    name: "Keyboard",
    price: 2500
  },
  {
    id: 3,
    name: "Cable",
    price: 400
  },
  {
    id: 4,
    name: "Monitor",
    price: 35000
  }
];

function getAffordableProducts(productArray, maxPrice) {

  return productArray.filter(function(product) {
    return product.price <= maxPrice;
  });

}

console.log("\n✅ PROBLEM 10: AFFORDABLE PRODUCTS");

const affordableProducts = getAffordableProducts(
  products,
  1500
);

for (const product of affordableProducts) {

  console.log(
    `${product.name}: Rs. ${product.price}`
  );

}


// =====================================
// AUTOMATED TEST SYSTEM
// =====================================

console.log("\n🧪 RUNNING AUTOMATED TESTS");
console.log("=========================");

let passedTests = 0;
let failedTests = 0;

function test(name, actual, expected) {

  const actualText = JSON.stringify(actual);
  const expectedText = JSON.stringify(expected);

  if (actualText === expectedText) {

    console.log("✅ PASS:", name);

    passedTests++;

  } else {

    console.error("❌ FAIL:", name);

    console.log("Expected:", expected);
    console.log("Received:", actual);

    failedTests++;

  }
}


// =====================================
// PROBLEM 1 TESTS
// =====================================

test(
  "1A - Format text",
  formatText("   hello world   "),
  "HELLO WORLD"
);

test(
  "1B - Empty string",
  formatText(""),
  ""
);


// =====================================
// PROBLEM 2 TESTS
// =====================================

test(
  "2A - Even numbers",
  getEvenNumbers([3, 8, 12, 17, 24, 31]),
  [8, 12, 24]
);

test(
  "2B - Empty array",
  getEvenNumbers([]),
  []
);

test(
  "2C - Negative and zero",
  getEvenNumbers([-3, -2, 0]),
  [-2, 0]
);


// =====================================
// PROBLEM 3 TESTS
// =====================================

test(
  "3A - Largest number",
  findLargestNumber([100, 25, 500, 60, 300]),
  500
);

test(
  "3B - Empty array",
  findLargestNumber([]),
  null
);

test(
  "3C - Negative numbers",
  findLargestNumber([-10, -2, -8]),
  -2
);


// =====================================
// PROBLEM 4 TESTS
// =====================================

test(
  "4A - Remove duplicates",
  removeDuplicates([5, 5, 10, 15, 10]),
  [5, 10, 15]
);

test(
  "4B - Empty array",
  removeDuplicates([]),
  []
);


// =====================================
// PROBLEM 5 TESTS
// =====================================

test(
  "5A - Count words",
  [...countWords(["cat", "dog", "cat"])],
  [["cat", 2], ["dog", 1]]
);

test(
  "5B - Empty word list",
  [...countWords([])],
  []
);


// =====================================
// PROBLEM 6 TESTS
// =====================================

test(
  "6A - City found",
  findCityIndex(cities, "Galle"),
  3
);

test(
  "6B - City not found",
  findCityIndex(cities, "Jaffna"),
  -1
);

test(
  "6C - Empty array",
  findCityIndex([], "Colombo"),
  -1
);


// =====================================
// PROBLEM 7 TESTS
// =====================================

test(
  "7A - Total prices",
  calculateTotal([25, 75, 100, 200, 50]),
  450
);

test(
  "7B - Empty array",
  calculateTotal([]),
  0
);


// =====================================
// PROBLEM 8 TESTS
// =====================================

test(
  "8A - Count JavaScript vowels",
  countVowels("JavaScript"),
  3
);

test(
  "8B - No vowels",
  countVowels("Sky"),
  0
);


// =====================================
// PROBLEM 9 TESTS
// =====================================

test(
  "9A - Reverse developer",
  reverseText("developer"),
  "repoleved"
);

test(
  "9B - Reverse empty text",
  reverseText(""),
  ""
);


// =====================================
// PROBLEM 10 TESTS
// =====================================

test(
  "10A - Affordable products",
  getAffordableProducts(products, 1500)
    .map(function(product) {
      return product.name;
    }),
  ["Mouse", "Cable"]
);

test(
  "10B - No affordable products",
  getAffordableProducts(products, 0),
  []
);


// =====================================
// FINAL CHECKPOINT RESULT
// =====================================

console.log("\n================================");
console.log("🏁 DAY 20 JAVASCRIPT TEST RESULTS");
console.log("================================");

console.log("✅ Passed:", passedTests);
console.log("❌ Failed:", failedTests);

console.log(
  "Total Tests:",
  passedTests + failedTests
);

if (failedTests === 0) {

  console.log("🎉 ALL 23 TESTS PASSED!");

} else {

  console.log("⚠️ Some tests need fixing.");

}

console.log("================================");
