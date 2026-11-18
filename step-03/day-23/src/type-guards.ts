
export {};

interface Product {
    id: number;
    name: string;
    price: number;
}

// Custom type guard
function isProduct(data: unknown): data is Product {
    if (typeof data !== "object" || data === null) {
        return false;
    }

    return (
        "id" in data &&
        typeof data.id === "number" &&
        "name" in data &&
        typeof data.name === "string" &&
        "price" in data &&
        typeof data.price === "number" &&
        Number.isFinite(data.price) &&
        data.price >= 0
    );
}

// Safely display product information
function displayProduct(data: unknown): void {
    if (isProduct(data)) {
        console.log("Product:", data.name);
        console.log("Price:", data.price);
    } else {
        console.log("Error: Invalid product data!");
    }
}

// Test valid and invalid data
console.log("Day 23 - Custom Type Guards");

displayProduct({
    id: 1,
    name: "Laptop",
    price: 250000
});

displayProduct({
    id: 2,
    name: "Keyboard",
    price: 5000
});

displayProduct({
    id: 3,
    name: "Mouse",
    price: "2500"
});

displayProduct(null);

displayProduct({
    id: 4,
    name: "Monitor",
    price: -100
});
