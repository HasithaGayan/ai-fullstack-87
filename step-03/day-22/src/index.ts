
// Type Alias
type Product = {
    id: number;
    name: string;
    price: number;
    inStock: boolean;
};

// Interface
interface User {
    id: number;
    name: string;
    email: string;
    phone?: string;
}

// Create a product
const product: Product = {
    id: 1,
    name: "Gaming Laptop",
    price: 250000,
    inStock: true
};

// Create a user
const user: User = {
    id: 101,
    name: "Alex",
    email: "alex@example.com"
};

// Function using our custom type
function displayProduct(item: Product): void {
    console.log("Product:", item.name);
    console.log("Price:", item.price);
    console.log("In Stock:", item.inStock);
}

// Function using our interface
function displayUser(person: User): void {
    console.log("User:", person.name);
    console.log("Email:", person.email);
    console.log("Phone:", person.phone ?? "Not provided");
}

// Run our functions
console.log("Day 22 - Types and Interfaces");

displayProduct(product);

console.log("--------------------");

displayUser(user);
