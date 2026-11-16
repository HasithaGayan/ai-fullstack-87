
# Day 18 — JavaScript API Data Explorer

## Project Overview

A responsive API Data Explorer built using HTML,
CSS, and Vanilla JavaScript.

The application fetches sample posts from a public
API and displays them as cards.

Users can search posts by title and reload data.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Fetch API
- Promises
- async/await
- DOM API
- AbortController

## API Used

JSONPlaceholder

https://jsonplaceholder.typicode.com/

Main endpoint:

https://jsonplaceholder.typicode.com/posts?_limit=6

This endpoint returns six example posts.

## Features

- Load posts from a public API
- Display posts as cards
- Search posts by title
- Display loading state
- Display success state
- Display empty results
- Display helpful error messages
- Handle HTTP errors
- Cancel outdated requests using AbortController
- Inspect HTTP requests using browser DevTools
- Responsive layout

## How to Run

1. Open the day-18 folder in VS Code.
2. Open index.html using Live Server.
3. Click "Load Posts".
4. Wait for the API response.
5. Search the loaded posts by title.
6. Click "Load Posts" again to reload the data.

An internet connection is required.

## How Fetch Works

1. The user clicks Load Posts.
2. JavaScript starts an HTTP request with fetch().
3. The app displays a loading message.
4. JavaScript checks response.ok.
5. The response body is parsed using response.json().
6. The application stores the posts in allPosts.
7. renderPosts() creates the HTML cards.
8. The app shows success, empty, or error feedback.

## Promise Concepts

A Promise can be:

- Pending
- Fulfilled
- Rejected

We practiced:

- .then()
- .catch()
- .finally()
- async
- await
- try...catch...finally

## Error Handling

The application checks HTTP responses using:

```javascript
if (!response.ok) {
  throw new Error(`HTTP Error: ${response.status}`);
}
```

Errors are caught and displayed on the webpage
instead of only appearing in the Console.

## Debugging Story — HTTP 404

Problem:

I intentionally requested an API resource that
did not exist.

Test URL:

https://jsonplaceholder.typicode.com/posts/99999999

What happened:

- The API returned HTTP 404.
- JavaScript detected response.ok was false.
- An Error was thrown.
- The catch block displayed a failure message.
- The application remained usable.

Fix:

I restored the original working API URL.

What I learned:

fetch() does not automatically reject for HTTP
error status codes such as 404.

We must inspect response.ok and handle errors.

## Empty Response Test

I tested:

https://jsonplaceholder.typicode.com/posts?userId=99999999

The API returned an empty array.

The application displayed:

"No posts are available."

This demonstrated that an empty successful response
is different from an HTTP failure.

## Request Cancellation

The application uses AbortController to cancel an
older request when a new request starts.

This helps prevent outdated responses from
overwriting newer application state.

## Testing Completed

- Successful API request
- HTTP status 200
- Displaying six post cards
- Filtering posts by title
- Search with no matching posts
- Empty API response
- HTTP 404 error
- Request cancellation
- Loading and error messages
- Network inspection in DevTools

## Known Limitations

- Requires an internet connection
- Uses sample API data, not a real user account
- Only loads six posts
- Search operates on loaded posts only
- Does not save data to localStorage
- Does not provide a backend database

## What I Learned

- Creating and handling Promises
- Using async and await
- Fetching JSON from an API
- Inspecting HTTP status codes
- Handling HTTP errors
- Rendering API data with the DOM
- Filtering arrays
- Managing asynchronous UI states
- Cancelling requests with AbortController
- Debugging requests in the Network tab
