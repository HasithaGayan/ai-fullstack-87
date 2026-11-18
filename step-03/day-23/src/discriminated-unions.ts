
export {};

// Define possible API states
type ApiState =
    | {
        status: "loading";
    }
    | {
        status: "success";
        data: number;
    }
    | {
        status: "error";
        message: string;
    };

// Handle each API state
function displayApiState(state: ApiState): void {
    switch (state.status) {
        case "loading":
            console.log("Loading dashboard data...");
            break;

        case "success":
            console.log("Data loaded successfully!");
            console.log("Total Users:", state.data);
            break;

        case "error":
            console.log("Error:", state.message);
            break;
    }
}

// Test our API states
console.log("Day 23 - Discriminated Unions");

displayApiState({
    status: "loading"
});

displayApiState({
    status: "success",
    data: 150
});

displayApiState({
    status: "error",
    message: "Failed to load dashboard data!"
});
