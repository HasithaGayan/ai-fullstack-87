
import { products, storeName } from "./data.js";

import {
  getProductNames,
  findProductById
} from "./utils.js";


import formatPrice from "./utils.js";


console.log("----- Day 15: JavaScript Modules -----");

console.log("Store:", storeName);
console.log("Total products:", products.length);

// Use a function imported from utils.js
const names = getProductNames(products);

console.log("Product names:", names);

// Find a product by its ID
const foundProduct = findProductById(products, 2);

console.log("Found product:", foundProduct?.name ?? "Not found");

// Test an ID that does not exist
const missingProduct = findProductById(products, 99);

console.log("Missing product:", missingProduct?.name ?? "Not found");



console.log("----- Default Export Practice -----");

console.log("Laptop price:", formatPrice(products[0].price));
console.log("Mouse price:", formatPrice(products[1].price));
console.log("Keyboard price:", formatPrice(products[2].price));




console.log("----- JavaScript Error Handling -----");

function calculateDiscount(price, discountPercent) {
  if (!Number.isFinite(price) || price < 0) {
    throw new Error("Invalid product price");
  }

  if (!Number.isFinite(discountPercent) ||
      discountPercent < 0 ||
      discountPercent > 100) {
    throw new Error("Invalid discount percentage");
  }

  return price - (price * discountPercent / 100);
}

try {
  const finalPrice = calculateDiscount(10000, 20);
  console.log("Discounted price:", finalPrice);
} catch (error) {
  console.error("Calculation failed:", error.message);
}

try {
  const finalPrice = calculateDiscount(-500, 20);
  console.log("Discounted price:", finalPrice);
} catch (error) {
  console.error("Calculation failed:", error.message);
}




console.log("----- JavaScript finally Practice -----");

function processDiscount(price, discount) {
  try {
    const result = calculateDiscount(price, discount);

    console.log("Success:", formatPrice(result));
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    console.log("Discount calculation finished.");
  }
}

processDiscount(10000, 10);
processDiscount(10000, 150);





console.log("----- JavaScript Classes -----");

class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  getDetails() {
    return `${this.name} costs Rs. ${this.price}`;
  }
}

const laptop = new Product("Laptop", 150000);
const mouse = new Product("Mouse", 2500);

console.log(laptop.getDetails());
console.log(mouse.getDetails());
console.log("Laptop name:", laptop.name);





console.log("----- JavaScript Prototypes -----");

console.log(
  "Same shared method:",
  laptop.getDetails === mouse.getDetails
);

console.log(
  "Laptop uses Product prototype:",
  Object.getPrototypeOf(laptop) === Product.prototype
);

console.log(
  "Method belongs to prototype:",
  Object.hasOwn(Product.prototype, "getDetails")
);





console.log("----- Factory Functions -----");

function createProduct(name, price) {
  return {
    name: name,
    price: price,

    getDetails() {
      return `${this.name} costs Rs. ${this.price}`;
    }
  };
}

const factoryLaptop = createProduct("Laptop", 150000);
const factoryMouse = createProduct("Mouse", 2500);

console.log(factoryLaptop.getDetails());
console.log(factoryMouse.getDetails());

console.log(
  "Factory methods are shared:",
  factoryLaptop.getDetails === factoryMouse.getDetails
);

console.log(
  "Class methods are shared:",
  laptop.getDetails === mouse.getDetails
);





console.log("----- JavaScript Event Loop -----");

console.log("1. Start");

setTimeout(() => {
  console.log("4. Timer callback");
}, 0);

Promise.resolve().then(() => {
  console.log("3. Promise callback");
});

console.log("2. End");






console.log("----- Event Loop Challenge -----");

console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

Promise.resolve().then(() => {
  console.log("C");
});

console.log("D");

Promise.resolve().then(() => {
  console.log("E");
});

console.log("F");






console.log("----- Handling Three Expected Failures -----");

function getValidProductPrice(id) {
  const product = findProductById(products, id);

  if (!product) {
    throw new Error(`Product with ID ${id} was not found`);
  }

  return product.price;
}

function testOperation(label, operation) {
  try {
    const result = operation();
    console.log(`${label}: Success - ${result}`);
  } catch (error) {
    console.error(`${label}: ${error.message}`);
  }
}

// Failure 1: Negative price
testOperation("Test 1", () => {
  return calculateDiscount(-100, 10);
});

// Failure 2: Invalid discount percentage
testOperation("Test 2", () => {
  return calculateDiscount(1000, 150);
});

// Failure 3: Missing product
testOperation("Test 3", () => {
  return getValidProductPrice(99);
});

// Successful operation
testOperation("Test 4", () => {
  return getValidProductPrice(2);
});





console.log("----- Day 15: Automated Tests -----");

function throwsExpectedError(operation, expectedMessage) {
  try {
    operation();
    return false;
  } catch (error) {
    return error instanceof Error &&
           error.message === expectedMessage;
  }
}

const day15Tests = [
  ["Product data", products.length === 3],

  ["Named export: product names",
    getProductNames(products).length === 3],

  ["Named export: find product",
    findProductById(products, 2)?.name === "Mouse"],

  ["Default export: format price",
    formatPrice(2500) === "Rs. 2,500"],

  ["Valid discount",
    calculateDiscount(10000, 20) === 8000],

  ["Invalid price error",
    throwsExpectedError(
      () => calculateDiscount(-100, 10),
      "Invalid product price"
    )],

  ["Invalid discount error",
    throwsExpectedError(
      () => calculateDiscount(1000, 150),
      "Invalid discount percentage"
    )],

  ["Missing product error",
    throwsExpectedError(
      () => getValidProductPrice(99),
      "Product with ID 99 was not found"
    )]
];

day15Tests.forEach(([name, passed]) => {
  if (passed) {
    console.log(`${name}: PASS ✅`);
  } else {
    console.error(`${name}: FAIL ❌`);
  }
});

console.log(
  "Tests passed:",
  day15Tests.filter(([, passed]) => passed).length,
  "/",
  day15Tests.length
);





try {
  console.log(getDiscountedProduct(1, 10));
  console.log(getDiscountedProduct(2, 20));
  console.log(getDiscountedProduct(99, 10));
} catch (error) {
  console.error(error.message);
}

try {
  console.log(getDiscountedProduct(1, 150));
} catch (error) {
  console.error(error.message);
}
