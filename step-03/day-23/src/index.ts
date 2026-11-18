
// Union type
type UserId = string | number;

// Type narrowing
function formatUserId(id: UserId): string {
    if (typeof id === "string") {
        return id.toUpperCase();
    }

    return `USER-${id}`;
}

// Another union type
function formatValue(value: string | number): string {
    if (typeof value === "number") {
        return value.toFixed(2);
    }

    return value.trim();
}

// Test our functions
console.log("Day 23 - Union Types and Narrowing");

console.log(formatUserId(101));
console.log(formatUserId("user-202"));

console.log(formatValue(1500.5));
console.log(formatValue("  TypeScript  "));
