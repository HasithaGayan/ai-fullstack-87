
export {};

interface Admin {
    name: string;
    permissions: string[];
}

interface Customer {
    name: string;
    email: string;
}

// Union of two object types
type AppUser = Admin | Customer;

// Object narrowing
function displayUser(user: AppUser): void {
    console.log("Name:", user.name);

    if ("permissions" in user) {
        console.log("Role: Admin");
        console.log("Permissions:", user.permissions);
    } else {
        console.log("Role: Customer");
        console.log("Email:", user.email);
    }
}

// Sample admin
const admin: Admin = {
    name: "Alex",
    permissions: ["read", "write", "delete"]
};

// Sample customer
const customer: Customer = {
    name: "Sam",
    email: "sam@example.com"
};

// Test our function
console.log("Day 23 - Object Narrowing");

displayUser(admin);

console.log("--------------------");

displayUser(customer);
