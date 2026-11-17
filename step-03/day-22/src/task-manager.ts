
interface Task {
    id: number;
    title: string;
    completed: boolean;
}

const tasks: Task[] = [
    {
        id: 1,
        title: "Learn TypeScript",
        completed: true
    },
    {
        id: 2,
        title: "Build Task Manager",
        completed: false
    }
];

let nextId: number = 3;

// Add a new task
function addTask(title: string): void {
    if (title.trim() === "") {
        console.log("Error: Task title cannot be empty!");
        return;
    }

    const newTask: Task = {
        id: nextId,
        title: title.trim(),
        completed: false
    };

    tasks.push(newTask);
    nextId++;

    console.log("Task added:", newTask.title);
}

// Mark a task as completed
function completeTask(id: number): void {
    const task = tasks.find(
        (item) => item.id === id
    );

    if (task === undefined) {
        console.log("Error: Task not found!");
        return;
    }

    task.completed = true;

    console.log("Task completed:", task.title);
}

// Delete a task
function deleteTask(id: number): void {
    const index = tasks.findIndex(
        (item) => item.id === id
    );

    if (index === -1) {
        console.log("Error: Cannot delete task. Task not found!");
        return;
    }

    const deletedTask = tasks.splice(index, 1)[0];

    console.log("Task deleted:", deletedTask.title);
}

// Display all tasks
function displayTasks(): void {
    console.log("===== TASK MANAGER =====");

    for (const task of tasks) {
        const status = task.completed
            ? "Completed"
            : "Pending";

        console.log(
            `${task.id}. ${task.title} - ${status}`
        );
    }
}

// Test adding tasks
addTask("Practice TypeScript Functions");
addTask("Upload Project to GitHub");
addTask("");

// Test completing tasks
completeTask(2);
completeTask(3);
completeTask(999);

// Test deleting tasks
deleteTask(2);

// Test invalid task ID
deleteTask(999);

// Display final results
displayTasks();
