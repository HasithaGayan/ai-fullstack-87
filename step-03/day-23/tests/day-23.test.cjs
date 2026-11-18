
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { execFileSync } = require("node:child_process");
const { stripVTControlCharacters } = require("node:util");

function runFile(file) {
    const output = execFileSync(
        process.execPath,
        [`dist/${file}.js`],
        {
            encoding: "utf8",
            env: {
                ...process.env,
                FORCE_COLOR: "0"
            }
        }
    );

    return stripVTControlCharacters(output);
}

test("Union types work correctly", () => {
    const output = runFile("index");
    assert.ok(output.includes("USER-101"));
    assert.ok(output.includes("USER-202"));
});

test("Object narrowing works", () => {
    const output = runFile("object-narrowing");
    assert.ok(output.includes("Role: Admin"));
    assert.ok(output.includes("Role: Customer"));
});

test("Custom type guards reject invalid data", () => {
    const output = runFile("type-guards");
    const errors = output
        .split(/\r?\n/)
        .filter(line =>
            line === "Error: Invalid product data!"
        );

    assert.equal(errors.length, 3);
});

test("Generics handle empty arrays", () => {
    const output = runFile("generics");
    assert.ok(output.includes("First Number: 10"));
    assert.ok(output.includes("Empty Array: undefined"));
});

test("Generic API responses handle errors", () => {
    const output = runFile("api-response");
    assert.ok(output.includes("Success: 500000"));
    assert.ok(output.includes("Error: User not found!"));
});

test("Utility types support user updates", () => {
    const output = runFile("user-service");
    assert.ok(output.includes("Updated Name: Alex Developer"));
    assert.ok(output.includes("Role: customer"));
});

test("Dashboard handles all three API states", () => {
    const output = runFile("dashboard-state");
    assert.ok(output.includes("Loading dashboard data..."));
    assert.ok(output.includes("Total Users: 1250"));
    assert.ok(output.includes("Error: Failed to load dashboard!"));
});

test("Task Manager handles invalid inputs", () => {
    const output = runFile("advanced-task-manager");
    assert.ok(output.includes("Error: Task title cannot be empty!"));
    assert.ok(output.includes("Error: Task not found!"));
    assert.ok(output.includes("Build InsightBoard Dashboard"));
});
