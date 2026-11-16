
console.log("----- Day 18: API Data Explorer -----");

// ===================================
// 1. SELECT HTML ELEMENTS
// ===================================

const loadButton = document.querySelector("#load-button");
const searchInput = document.querySelector("#search-input");
const statusMessage = document.querySelector("#status");
const postCount = document.querySelector("#post-count");
const postsContainer = document.querySelector("#posts-container");

// ===================================
// 2. API ADDRESS
// ===================================

const API_URL =
  "https://jsonplaceholder.typicode.com/posts?_limit=6";

// ===================================
// 3. APPLICATION STATE
// ===================================

let allPosts = [];

let hasLoaded = false;

// NEW: Keep track of the latest API request.
let activeController = null;

// ===================================
// 4. DISPLAY POSTS AS CARDS
// ===================================

function renderPosts(posts) {
  postsContainer.replaceChildren();

  postCount.textContent =
    `Showing ${posts.length} of ${allPosts.length} posts`;

  posts.forEach(function(post) {
    const card = document.createElement("article");
    card.className = "post-card";

    const postId = document.createElement("p");
    postId.textContent = `Post #${post.id}`;

    const title = document.createElement("h3");
    title.textContent = post.title;

    const body = document.createElement("p");
    body.textContent = post.body;

    card.append(postId, title, body);
    postsContainer.append(card);
  });
}

// ===================================
// 5. SEARCH POSTS
// ===================================

function filterPosts() {
  if (!hasLoaded) {
    return;
  }

  const searchText =
    searchInput.value.trim().toLowerCase();

  const filteredPosts = allPosts.filter(function(post) {
    return post.title.toLowerCase().includes(searchText);
  });

  renderPosts(filteredPosts);

  if (allPosts.length === 0) {
    statusMessage.textContent =
      "No posts are available.";
  } else if (filteredPosts.length === 0) {
    statusMessage.textContent =
      "🔎 No posts match your search.";
  } else {
    statusMessage.textContent =
      "✅ Posts loaded successfully!";
  }
}

// ===================================
// 6. FETCH POSTS WITH ABORTCONTROLLER
// ===================================

async function loadPosts() {

  // NEW: Cancel the previous request, if any.
  if (activeController !== null) {
    activeController.abort();
    console.log("Cancelling previous request...");
  }

  // NEW: Create a controller for this request.
  const controller = new AbortController();

  // Remember that this is the latest request.
  activeController = controller;

  // Reset the application state.
  allPosts = [];
  hasLoaded = false;

  postsContainer.replaceChildren();
  postCount.textContent = "";

  statusMessage.textContent = "⏳ Loading posts...";

  // Keep the button enabled so users can restart.
  loadButton.textContent = "🔄 Restart Request";

  try {

    // NEW: Pass the controller's signal to fetch.
    const response = await fetch(API_URL, {
      signal: controller.signal
    });

    console.log("HTTP status:", response.status);

    if (!response.ok) {
      throw new Error(
        `HTTP Error: ${response.status}`
      );
    }

    const posts = await response.json();

    // NEW: Ignore results from outdated requests.
    if (controller !== activeController) {
      return;
    }

    if (!Array.isArray(posts)) {
      throw new Error("Invalid API response.");
    }

    const validPosts = posts.every(function(post) {
      return (
        post !== null &&
        typeof post === "object" &&
        typeof post.title === "string" &&
        typeof post.body === "string"
      );
    });

    if (!validPosts) {
      throw new Error("Invalid post data.");
    }

    allPosts = posts;
    hasLoaded = true;

    console.log("Posts received:", allPosts.length);

    filterPosts();

  } catch (error) {

    // NEW: Cancellation is not an application failure.
    if (error.name === "AbortError") {
      console.log("Previous request was cancelled.");
      return;
    }

    // Ignore errors from outdated requests.
    if (controller !== activeController) {
      return;
    }

    statusMessage.textContent =
      "❌ Could not load posts. Please try again.";

    postCount.textContent = "";

    console.error("API error:", error.message);

  } finally {

    // NEW: Only the latest request resets the button.
    if (controller === activeController) {
      activeController = null;

      loadButton.textContent = "🔄 Load Posts";

      console.log("Latest API request finished!");
    }

  }
}

// ===================================
// 7. LOAD BUTTON EVENT
// ===================================

loadButton.addEventListener("click", function() {
  loadPosts();
});

// ===================================
// 8. SEARCH INPUT EVENT
// ===================================

searchInput.addEventListener("input", function() {
  filterPosts();
});

// ===================================
// 9. INITIAL MESSAGE
// ===================================

statusMessage.textContent =
  'Click "Load Posts" to get started.';

console.log("API Data Explorer is ready!");
