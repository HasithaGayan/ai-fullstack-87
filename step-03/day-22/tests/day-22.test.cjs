
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { execFileSync } = require("node:child_process");

const taskOutput = execFileSync(
    process.execPath,
    ["dist/task-manager.js"],
    { encoding: "utf8" }
);

const validationOutput = execFileSync(
    process.execPath,
    ["dist/validation.js"],
    { encoding: "utf8" }
);

test("Add a new task", () => {
    assert.ok(
        taskOutput.includes(
            "Task added: Practice TypeScript Functions"
        )
    );
});

test("Reject empty task title", () => {
    assert.ok(
        taskOutput.includes(
            "Error: Task title cannot be empty!"
        )
    );
});

test("Complete an existing task", () => {
    assert.ok(
        taskOutput.includes(
            "Task completed: Build Task Manager"
        )
    );
});

test("Delete an existing task", () => {
    assert.ok(
        taskOutput.includes(
            "Task deleted: Build Task Manager"
        )
    );

    assert.ok(
        !taskOutput.includes(
            "2. Build Task Manager -"
        )
    );
});

test("Reject invalid task ID", () => {
    assert.ok(
        taskOutput.includes(
            "Error: Task not found!"
        )
    );
});

test("Accept valid external data", () => {
    assert.ok(
        validationOutput.includes(
            "Accepted: Learn TypeScript"
        )
    );
});

test("Reject invalid external data", () => {
    const rejected = validationOutput
        .split(/\r?\n/)
        .filter(
            line => line === "Rejected: Invalid task data!"
        );

    assert.equal(rejected.length, 4);
});
