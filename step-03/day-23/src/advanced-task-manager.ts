
export {};

interface Task {
    id: number;
    title: string;
    completed: boolean;
}

// Allow selected task updates
type TaskUpdate = Partial<
    Pick<Task, "title" | "completed">
>;

// Reusable generic result
type Result<T> =
    | { success: true; data: T }
    | { success: false; error: string };

const tasks: Task[] = [];

let nextId: number = 1;

// Add a task
function addTask(title: string): Result<Task> {
    if (title.trim() === "") {
        return {
            success: false,
            error: "Task title cannot be empty!"
        };
    }

    const task: Task = {
        id: nextId++,
        title: title.trim(),
        completed: false
    };

    tasks.push(task);

    return {
        success: true,
        data: task
    };
}

// Find a task safely
function findTask(id: number): Task | undefined {
    return tasks.find(task => task.id === id);
}

// Update a task
function updateTask(
    id: number,
    changes: TaskUpdate
): Result<Task> {
    const task = findTask(id);

    if (task === undefined) {
        return {
            success: false,
            error: "Task not found!"
        };
    }

    if (changes.title !== undefined) {
        if (changes.title.trim() === "") {
            return {
                success: false,
                error: "Task title cannot be empty!"
            };
        }

        task.title = changes.title.trim();
    }

    if (changes.completed !== undefined) {
        task.completed = changes.completed;
    }

    return {
        success: true,
        data: task
    };
}

// Display generic result
function displayResult<T>(result: Result<T>): void {
    if (result.success) {
        console.log("Success:", result.data);
    } else {
        console.log("Error:", result.error);
    }
}

// Test our task manager
console.log("Day 23 - Advanced Task Manager");

displayResult(addTask("Learn Advanced TypeScript"));

displayResult(addTask("Build InsightBoard"));

displayResult(addTask(""));

displayResult(updateTask(1, {
    completed: true
}));

displayResult(updateTask(2, {
    title: "Build InsightBoard Dashboard"
}));

displayResult(updateTask(999, {
    completed: true
}));

console.log("===== FINAL TASKS =====");

console.log(tasks);
