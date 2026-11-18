
export {};

// Generic identity function
function identity<T>(value: T): T {
    return value;
}

// Generic array function
function getFirst<T>(items: T[]): T | undefined {
    return items[0];
}

// Generic object function
function createPair<T, U>(
    first: T,
    second: U
): { first: T; second: U } {
    return {
        first,
        second
    };
}

// Test identity function
console.log("Day 23 - TypeScript Generics");

console.log(identity<string>("Hello TypeScript"));

console.log(identity<number>(100));

console.log(identity<boolean>(true));

// Test generic arrays
console.log("First Skill:", getFirst([
    "HTML",
    "CSS",
    "TypeScript"
]));

console.log("First Number:", getFirst([10, 20, 30]));

// Test empty array
console.log("Empty Array:", getFirst<string>([]));

// Test two generic types
console.log("Pair:", createPair("Laptop", 250000));
