
export {};

interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}

// Partial - Make all properties optional
type UserUpdate = Partial<User>;

// Pick - Select specific properties
type UserContact = Pick<User, "name" | "email">;

// Omit - Exclude specific properties
type PublicUser = Omit<User, "password">;

// Record - Create typed key-value data
type UserRole = "admin" | "customer";

type UserCounts = Record<UserRole, number>;

// Test Partial
const update: UserUpdate = {
    name: "Alex Updated"
};

// Test Pick
const contact: UserContact = {
    name: "Alex",
    email: "alex@example.com"
};

// Test Omit
const publicUser: PublicUser = {
    id: 1,
    name: "Alex",
    email: "alex@example.com"
};

// Test Record
const userCounts: UserCounts = {
    admin: 5,
    customer: 150
};

// Display results
console.log("Day 23 - Utility Types");

console.log("Partial:", update);

console.log("Pick:", contact);

console.log("Omit:", publicUser);

console.log("Record:", userCounts);

console.log("Total Users:",
    userCounts.admin + userCounts.customer
);
