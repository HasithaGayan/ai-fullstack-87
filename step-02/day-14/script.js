
console.log("----- Day 14: JavaScript Arrays -----");

const fruits = ["Apple", "Banana", "Mango"];

console.log("All fruits:", fruits);
console.log("First fruit:", fruits[0]);
console.log("Second fruit:", fruits[1]);
console.log("Total fruits:", fruits.length);





console.log("----- Adding and Removing Array Items -----");

const colors = ["Red", "Blue", "Green"];

console.log("Original:", colors);

colors.push("Yellow");
console.log("After push:", colors);

const removedColor = colors.pop();

console.log("Removed color:", removedColor);
console.log("After pop:", colors);
console.log("Total colors:", colors.length);





console.log("----- JavaScript Objects -----");

const product = {
  id: 1,
  name: "Laptop",
  price: 150000,
  category: "Electronics",
  inStock: true
};

console.log("Full product:", product);
console.log("Product name:", product.name);
console.log("Product price:", product.price);
console.log("Category:", product.category);
console.log("In stock:", product.inStock);






console.log("----- Nested Objects and Arrays of Objects -----");

const products = [
  {
    id: 1,
    name: "Laptop",
    price: 150000,
    category: "Electronics",
    supplier: {
      name: "Tech Store",
      city: "Colombo"
    }
  },
  {
    id: 2,
    name: "Mouse",
    price: 2500,
    category: "Accessories",
    supplier: {
      name: "Computer Hub",
      city: "Negombo"
    }
  },
  {
    id: 3,
    name: "Keyboard",
    price: 6500,
    category: "Accessories",
    supplier: {
      name: "Tech Store",
      city: "Colombo"
    }
  }
];

console.log("All products:", products);
console.log("First product:", products[0].name);
console.log("Second product price:", products[1].price);
console.log("Third supplier:", products[2].supplier.name);
console.log("Total products:", products.length);






console.log("----- Adding More Products -----");

products.push(
  {
    id: 4,
    name: "Monitor",
    price: 42000,
    category: "Electronics",
    rating: 4.6,
    supplier: {
      name: "Display Center",
      city: "Colombo"
    }
  },
  {
    id: 5,
    name: "USB Cable",
    price: 1200,
    category: "Accessories",
    rating: 4.3,
    supplier: {
      name: "Computer Hub",
      city: "Negombo"
    }
  },
  {
    id: 6,
    name: "Webcam",
    price: 14500,
    category: "Electronics",
    rating: 4.2,
    supplier: {
      name: "Tech Store",
      city: "Kandy"
    }
  }
);

console.log("Total products:", products.length);
console.log("Sixth product:", products[5].name);
console.log("Monitor rating:", products[3].rating);




console.log("----- Adding Products 7, 8 and 9 -----");

products.push(
  {
    id: 7,
    name: "Headphones",
    price: 8500,
    category: "Accessories",
    rating: 4.7,
    supplier: {
      name: "Audio World",
      city: "Colombo"
    }
  },
  {
    id: 8,
    name: "Office Chair",
    price: 28000,
    category: "Furniture",
    rating: 4.5,
    supplier: {
      name: "Comfort Furniture",
      city: "Gampaha"
    }
  },
  {
    id: 9,
    name: "Desk Lamp",
    price: 4500,
    category: "Furniture",
    rating: 4.4,
    supplier: {
      name: "Home Essentials",
      city: "Negombo"
    }
  }
);

console.log("Total products:", products.length);
console.log("Seventh product:", products[6].name);
console.log("Ninth product:", products[8].name);
console.log("Office Chair price:", products[7].price);




console.log("----- Adding Products 10, 11 and 12 -----");

products.push(
  {
    id: 10,
    name: "Smartphone",
    price: 95000,
    category: "Electronics",
    rating: 4.8,
    supplier: {
      name: "Mobile World",
      city: "Colombo"
    }
  },
  {
    id: 11,
    name: "Notebook",
    price: 650,
    category: "Stationery",
    rating: 4.5,
    supplier: {
      name: "Book Center",
      city: "Negombo"
    }
  },
  {
    id: 12,
    name: "Pen Set",
    price: 900,
    category: "Stationery",
    rating: 4.1,
    supplier: {
      name: "Book Center",
      city: "Gampaha"
    }
  }
);

// Add ratings to the first three products.
products[0].rating = 4.9;
products[1].rating = 4.4;
products[2].rating = 4.6;

console.log("Total products:", products.length);
console.log("Tenth product:", products[9].name);
console.log("Twelfth product:", products[11].name);
console.log("Laptop rating:", products[0].rating);





console.log("----- Array map() Method -----");

const productNames = products.map(function(product) {
  return product.name;
});

console.log("Product names:", productNames);
console.log("Total names:", productNames.length);
console.log("First name:", productNames[0]);
console.log("Last name:", productNames[11]);






console.log("----- Array filter() Method -----");

const electronicProducts = products.filter(function(product) {
  return product.category === "Electronics";
});

console.log("Electronics:", electronicProducts);
console.log("Total electronics:", electronicProducts.length);

const electronicNames = electronicProducts.map(function(product) {
  return product.name;
});

console.log("Electronic product names:", electronicNames);






console.log("----- Array find() Method -----");

const foundProduct = products.find(function(product) {
  return product.id === 10;
});

console.log("Found product:", foundProduct);
console.log("Product name:", foundProduct.name);
console.log("Product price:", foundProduct.price);

const missingProduct = products.find(function(product) {
  return product.id === 99;
});

console.log("Missing product:", missingProduct);





console.log("----- Array some() and every() -----");

const hasExpensiveProduct = products.some(function(product) {
  return product.price > 100000;
});

const allProductsHaveNames = products.every(function(product) {
  return typeof product.name === "string" &&
         product.name.length > 0;
});

const allProductsAffordable = products.every(function(product) {
  return product.price < 50000;
});

console.log("Any product above 100000?", hasExpensiveProduct);
console.log("All products have names?", allProductsHaveNames);
console.log("All products below 50000?", allProductsAffordable);





console.log("----- Array reduce() Method -----");

const totalPrice = products.reduce(function(total, product) {
  return total + product.price;
}, 0);

console.log("Total price of all products:", totalPrice);

const totalRating = products.reduce(function(total, product) {
  return total + product.rating;
}, 0);

const averageRating = totalRating / products.length;

console.log("Average product rating:", averageRating.toFixed(2));





console.log("----- JavaScript Destructuring -----");

// Object destructuring
const {
  name: laptopName,
  price: laptopPrice
} = products[0];

console.log("Laptop name:", laptopName);
console.log("Laptop price:", laptopPrice);

// Array destructuring
const [firstProduct, secondProduct] = products;

console.log("First product:", firstProduct.name);
console.log("Second product:", secondProduct.name);






console.log("----- JavaScript Spread Operator -----");

// Copy an array
const copiedProducts = [...products];

console.log("Original count:", products.length);
console.log("Copied count:", copiedProducts.length);

// Copy an object and update its price
const discountedLaptop = {
  ...products[0],
  price: 135000
};

console.log("Original laptop price:", products[0].price);
console.log("Discounted laptop price:", discountedLaptop.price);
console.log("Discounted product name:", discountedLaptop.name);






console.log("----- JavaScript Rest Parameters -----");

function addPrices(...prices) {
  let total = 0;

  for (const price of prices) {
    total += price;
  }

  return total;
}

console.log("Two prices:", addPrices(100, 200));
console.log("Three prices:", addPrices(100, 200, 300));
console.log("No prices:", addPrices());





console.log("----- Optional Chaining and Nullish Coalescing -----");

// Existing product with supplier information
const laptopCity = products[0].supplier?.city ?? "Unknown city";

console.log("Laptop supplier city:", laptopCity);

// Product with missing supplier information
const mysteryProduct = {
  id: 13,
  name: "Mystery Item",
  price: 0
};

const mysteryCity = mysteryProduct.supplier?.city ?? "Unknown city";

console.log("Mystery supplier city:", mysteryCity);

// Safely handle a product that does not exist
const missingItem = products.find(product => product.id === 99);

console.log("Missing product name:", missingItem?.name ?? "Not found");

// Nullish coalescing preserves valid zero values
console.log("Mystery price:", mysteryProduct.price ?? 100);





console.log("----- Product Search Function -----");

function searchProducts(searchTerm) {
  if (typeof searchTerm !== "string") {
    return [];
  }

  const normalizedTerm = searchTerm.trim().toLowerCase();

  return products.filter(function(product) {
    return product.name.toLowerCase().includes(normalizedTerm);
  });
}

console.log("Search lap:", searchProducts("lap").map(p => p.name));
console.log("Search phone:", searchProducts("phone").map(p => p.name));
console.log("Search xyz:", searchProducts("xyz").map(p => p.name));






console.log("----- Product Category Filter -----");

function filterByCategory(category) {
  if (typeof category !== "string") {
    return [];
  }

  const normalizedCategory = category.trim().toLowerCase();

  return products.filter(function(product) {
    return product.category.toLowerCase() === normalizedCategory;
  });
}

console.log(
  "Electronics:",
  filterByCategory("Electronics").map(p => p.name)
);

console.log(
  "Furniture:",
  filterByCategory("Furniture").map(p => p.name)
);

console.log(
  "Stationery:",
  filterByCategory("Stationery").map(p => p.name)
);

console.log(
  "Toys:",
  filterByCategory("Toys").map(p => p.name)
);






console.log("----- Product Price Sorting -----");

function sortProductsByPrice(order = "asc") {
  const sortedProducts = [...products];

  if (order === "desc") {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else {
    sortedProducts.sort((a, b) => a.price - b.price);
  }

  return sortedProducts;
}

const cheapestFirst = sortProductsByPrice("asc");
const expensiveFirst = sortProductsByPrice("desc");

console.log(
  "Cheapest 3:",
  cheapestFirst.slice(0, 3).map(p => `${p.name}: ${p.price}`)
);

console.log(
  "Most expensive 3:",
  expensiveFirst.slice(0, 3).map(p => `${p.name}: ${p.price}`)
);

console.log("Original first product:", products[0].name);






console.log("----- Day 14: Edge-Case Tests -----");

// Search for a product that does not exist
console.assert(
  searchProducts("xyz").length === 0,
  "FAIL: Missing product search"
);

// Invalid search input
console.assert(
  searchProducts(null).length === 0,
  "FAIL: Invalid search input"
);

// Category that does not exist
console.assert(
  filterByCategory("Toys").length === 0,
  "FAIL: Missing category"
);

// Ascending price sorting
console.assert(
  sortProductsByPrice("asc")[0].price === 650,
  "FAIL: Ascending sort"
);

// Descending price sorting
console.assert(
  sortProductsByPrice("desc")[0].price === 150000,
  "FAIL: Descending sort"
);

// Check original dataset was not reordered
console.assert(
  products[0].name === "Laptop",
  "FAIL: Original dataset was reordered"
);

// Empty array edge case
console.assert(
  [].filter(item => item.price > 1000).length === 0,
  "FAIL: Empty array filtering"
);

console.log("All 7 assertions executed.");





console.log("----- Independent Challenge: Affordable Products -----");

function getAffordableProducts(maxPrice) {
    if (!Number.isFinite(maxPrice) || maxPrice < 0) {
        return [];
    }

    return products
        .filter(product => product.price <= maxPrice)
        .map(product => product.name);
}

console.log(getAffordableProducts(1000));
console.log(getAffordableProducts(3000));
console.log(getAffordableProducts(500));
console.log(getAffordableProducts(-5));