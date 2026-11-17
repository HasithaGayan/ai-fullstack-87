
export {};

interface Task {
    id: number;
    title: string;
    completed: boolean;
}

// Validate an unknown task object
function validateTask(data: unknown): Task | undefined {
    // Check whether data is an object
    if (typeof data !== "object" || data === null) {
        return undefined;
    }

    // Check required properties
    if (
        !("id" in data) ||
        !("title" in data) ||
        !("completed" in data)
    ) {
        return undefined;
    }

    // Validate property types
    if (
        typeof data.id !== "number" ||
        typeof data.title !== "string" ||
        typeof data.completed !== "boolean"
    ) {
        return undefined;
    }

    // Validate property values
    if (
        !Number.isSafeInteger(data.id) ||
        data.id <= 0 ||
        data.title.trim() === ""
    ) {
        return undefined;
    }

    return {
        id: data.id,
        title: data.title.trim(),
        completed: data.completed
    };
}

// Display validation results
function testTask(data: unknown): void {
    const task = validateTask(data);

    if (task === undefined) {
        console.log("Rejected: Invalid task data!");
        return;
    }

    console.log("Accepted:", task.title);
}

// Test our validation
console.log("Day 22 - Task Object Validation");

// Valid task
testTask({
    id: 1,
    title: "Learn TypeScript",
    completed: true
});

// Invalid ID type
testTask({
    id: "2",
    title: "Build Project",
    completed: false
});

// Missing property
testTask({
    id: 3,
    title: "Learn React"
});

// Invalid title
testTask({
    id: 4,
    title: "",
    completed: false
});

// Invalid object
testTask(null);

// Valid task with extra spaces
testTask({
    id: 5,
    title: "  Build AI App  ",
    completed: false
});
