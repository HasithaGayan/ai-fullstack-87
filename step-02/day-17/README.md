
# Day 17 — JavaScript Task Manager

## Project Overview

A responsive Task Manager built using HTML, CSS,
and Vanilla JavaScript.

Users can create, edit, delete, complete, and
filter tasks. Tasks are saved in browser localStorage
so they remain available after refreshing the page.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Browser DOM API
- localStorage
- JSON

## Features

- Add new tasks
- Edit existing tasks
- Delete tasks
- Mark tasks as completed
- Mark completed tasks as active again
- Filter tasks by All, Active, and Completed
- Display the number of remaining tasks
- Save tasks automatically in localStorage
- Restore saved tasks after refreshing
- Reject empty tasks
- Limit tasks to 100 characters
- Handle missing or corrupted stored data
- Responsive layout for mobile devices

## Task Data Structure

Each task is represented as a JavaScript object:

```javascript
{
  id: "unique-task-id",
  text: "Learn JavaScript",
  completed: false,
  createdAt: "2026-11-16T10:00:00.000Z"
}
```

## How to Run

1. Open the day-17 folder in VS Code.
2. Open index.html using Live Server.
3. Enter a task and click Add.
4. Use the checkbox to complete tasks.
5. Use Edit or Delete to manage tasks.
6. Use the filters to view different tasks.
7. Refresh the page to verify persistence.

## How localStorage Works

The application saves tasks using:

- JSON.stringify()
- localStorage.setItem()

The application restores tasks using:

- localStorage.getItem()
- JSON.parse()

A try...catch block handles invalid stored JSON.

## Testing

The following manual checks were completed:

- Adding tasks
- Editing tasks
- Deleting tasks
- Completing and uncompleting tasks
- Filtering tasks
- Refreshing and restoring tasks
- Rejecting empty input
- Rejecting oversized edited tasks
- Recovering from corrupted JSON

## Known Limitations

- Tasks are stored only in the current browser.
- Tasks do not sync between devices.
- Clearing browser site data may remove tasks.
- The selected filter resets to All on refresh.
- There is no backend or user authentication.

## What I Learned

- Working with HTML forms
- Handling submit, click, and change events
- Using event.preventDefault()
- Managing application state in an array
- Creating and rendering DOM elements
- Using find(), filter(), and forEach()
- Using JSON.stringify() and JSON.parse()
- Saving and restoring data with localStorage
- Validating user input
- Handling errors using try...catch
- Testing application behavior
