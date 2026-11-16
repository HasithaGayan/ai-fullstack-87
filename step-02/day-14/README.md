
# Day 14 - JavaScript Arrays and Objects

## Learning Goals

Learn how to store, transform, search, filter, and sort
realistic product data using modern JavaScript.

## Topics Covered

- Arrays and array indexing
- push() and pop()
- Objects and nested objects
- Arrays of objects
- map()
- filter()
- find()
- some()
- every()
- reduce()
- Object and array destructuring
- Spread operator (...)
- Rest parameters (...)
- Optional chaining (?.)
- Nullish coalescing (??)
- Array sorting

## Product Dataset

Created 12 products with:

- Unique IDs
- Product names
- Prices
- Categories
- Ratings
- Nested supplier details

Categories include Electronics, Accessories,
Furniture, and Stationery.

## Reusable Functions

### searchProducts(searchTerm)

Searches product names without case sensitivity.

### filterByCategory(category)

Filters products by category.

### sortProductsByPrice(order)

Sorts products by price in ascending or descending
order without reordering the original dataset.

## Testing

Added 7 console.assert() checks covering:

- Missing search results
- Invalid search input
- Missing category
- Ascending sorting
- Descending sorting
- Original dataset order
- Empty array filtering

All 7 assertions passed during guided testing.

## How to Run

1. Open index.html with VS Code Live Server.
2. Open browser DevTools using F12.
3. Select the Console tab.
4. Review the JavaScript output and test results.

## Project Files

- index.html - HTML page
- script.js - Product data, utilities, and tests
- README.md - Documentation

## Key Takeaways

Array methods help transform and analyze collections
of data.

Reusable functions make searching, filtering, and
sorting easier.

Copying an array before sort() helps preserve the
original dataset.

## Next Steps

Practice building data utilities independently.
Continue learning JavaScript and Browser APIs.
