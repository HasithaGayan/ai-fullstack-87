
export {};

// Generic result type
type Result<T> =
    | {
        success: true;
        data: T;
    }
    | {
        success: false;
        error: string;
    };

// User interface
interface User {
    id: number;
    name: string;
}

// Product interface
interface Product {
    id: number;
    name: string;
    price: number;
}

// Generic success function
function createSuccess<T>(data: T): Result<T> {
    return {
        success: true,
        data
    };
}

// Generic error function
function createError<T>(error: string): Result<T> {
    return {
        success: false,
        error
    };
}

// Display any result type
function displayResult<T>(result: Result<T>): void {
    if (result.success) {
        console.log("Success:", result.data);
    } else {
        console.log("Error:", result.error);
    }
}

// Test our generic responses
console.log("Day 23 - Generic API Responses");

const userResult = createSuccess<User>({
    id: 1,
    name: "Alex"
});

const productResult = createSuccess<Product>({
    id: 101,
    name: "Laptop",
    price: 250000
});

const revenueResult = createSuccess<number>(500000);

const errorResult = createError<User>(
    "User not found!"
);

displayResult(userResult);
displayResult(productResult);
displayResult(revenueResult);
displayResult(errorResult);
