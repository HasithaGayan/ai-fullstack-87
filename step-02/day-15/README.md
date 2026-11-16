
# Day 15 - JavaScript Modules and Error Handling

## Learning Goals

Learn how to organize JavaScript code into modules,
handle errors safely, use classes and factory functions,
and understand the JavaScript event loop.

## Topics Covered

- ES modules
- Named exports and imports
- Default exports and imports
- Error objects
- throw
- try/catch/finally
- JavaScript classes
- Constructors and methods
- Prototypes
- Factory functions
- Call stack
- Promise microtasks
- setTimeout and the event loop

## Project: Product Manager

Created a small product application using separate modules.

### Files

- index.html - HTML entry page
- data.js - Product data and store name
- utils.js - Reusable product functions
- main.js - Application logic and tests
- README.md - Project documentation

## Module Structure

data.js exports:

- products
- storeName

utils.js provides:

- getProductNames()
- findProductById()
- formatPrice() as the default export

main.js imports and uses these values and functions.

## Error Handling

Practiced three expected failures:

1. Negative product price
2. Discount percentage above 100
3. Product ID not found

Used try/catch to handle errors with useful messages.

## Classes and Factory Functions

Created product objects using a Product class
and a createProduct() factory function.

Learned how class instances share methods through
the prototype.

## JavaScript Event Loop

Practiced predicting execution order:

1. Synchronous JavaScript
2. Promise microtasks
3. Timer callbacks

## Testing

Created eight automated checks.

Result: 8 / 8 tests passed during guided testing.

## How to Run

1. Open index.html using VS Code Live Server.
2. Press F12 in the browser.
3. Select the Console tab.
4. Review module output and test results.

## Key Takeaway

JavaScript modules help organize code into reusable files.

Error handling prevents expected failures from causing
uncontrolled application crashes.

The event loop determines when scheduled callbacks run.

## Next Steps

Complete independent practice and upload the project
to GitHub.
