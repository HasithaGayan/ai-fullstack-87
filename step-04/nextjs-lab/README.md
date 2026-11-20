
# NextLab

Next.js App Router Learning Workspace

## Overview

NextLab is a TypeScript-based Next.js application
created to explore modern React framework architecture,
file-based routing, nested layouts and server rendering.

This application is part of Step 4 of the
87-day AI and Full-Stack Development roadmap.

## Project Status

- Started: 19 November 2026
- Roadmap: Day 31-38
- Current milestone: App Router Fundamentals
- Status: In Development

NextLab is a learning workspace that prepares
for the Next.js migration of InsightBoard.

## Features

- Next.js App Router
- Root shared layout
- Nested products layout
- Framework navigation using next/link
- Typed product dataset
- Product catalog
- Dynamic product details
- Inventory summary dashboard
- Custom not-found experience
- Responsive CSS layout
- Keyboard-accessible links

## Technology Stack

- Next.js 16.4.6
- React
- TypeScript
- Turbopack
- ESLint
- CSS
- Node.js
- npm
- Git and GitHub

See [versions.md](./versions.md) for exact
installed dependency versions.

## Application Routes

| URL | Source File |
| --- | --- |
| / | src/app/page.tsx |
| /products | src/app/products/page.tsx |
| /products/:id | src/app/products/[id]/page.tsx |
| /dashboard | src/app/dashboard/page.tsx |
| Unmatched routes | src/app/not-found.tsx |

## Route File Tree

    src/
    ├── app/
    │   ├── layout.tsx
    │   ├── page.tsx
    │   ├── globals.css
    │   ├── not-found.tsx
    │   ├── products/
    │   │   ├── layout.tsx
    │   │   ├── page.tsx
    │   │   └── [id]/
    │   │       └── page.tsx
    │   └── dashboard/
    │       └── page.tsx
    └── data/
        └── products.ts

## Layout Architecture

    RootLayout
      ├── Header
      ├── Navigation
      ├── Main Content
      │   ├── HomePage
      │   ├── ProductsLayout
      │   │   ├── ProductsPage
      │   │   └── ProductDetailsPage
      │   └── DashboardPage
      └── Footer

The root layout provides shared navigation
and page structure.

The nested products layout wraps the product
catalog and individual product details.

## Dynamic Routing

The products/[id] folder defines a dynamic
route segment.

The details page receives asynchronous route
parameters and retrieves the corresponding product.

### Request Flow

    /products/1
          |
          v
    ProductDetailsPage
          |
          v
    await params
          |
          v
    getProductById("1")
          |
          v
    Render Product Details

If the product does not exist, notFound()
activates the custom not-found experience.

## Rendering

Pages and layouts are Server Components by default.

The current application uses a local product dataset.

The product details route is dynamically
server-rendered on demand.

## Dashboard Calculations

- Total products: products.length
- Total stock: sum of product quantities
- Inventory value: sum of price multiplied by quantity
- Out of stock: count of products with zero quantity

Initial demonstration values:

| Metric | Value |
| --- | ---: |
| Total products | 3 |
| Units in stock | 18 |
| Inventory value | $3,025 |
| Out of stock | 0 |

## Getting Started

### Install Dependencies

    npm ci

### Development Server

    npm run dev

Open http://localhost:3000.

### Code Quality

    npm run lint

### Production Build

    npm run build

### Production Server

    npm start

Windows PowerShell users may use npm.cmd
instead of npm when required.

## Manual Test Scenarios

| Route | Expected Result |
| --- | --- |
| / | Home page |
| /products | Product catalog |
| /products/1 | Laptop details |
| /products/2 | Mouse details |
| /products/3 | Keyboard details |
| /dashboard | Inventory summary |
| /products/999 | Not-found page |
| /products/abc | Not-found page |
| /unknown | Not-found page |

Additional checks include direct URL navigation,
browser refresh, Back and Forward navigation,
shared layouts and responsive behavior.

## Day 31 Learning Objectives

- Next.js project configuration
- App Router conventions
- Root and nested layouts
- Dynamic route parameters
- Framework navigation
- Not-found handling
- Production compilation
- Route architecture documentation

## Day 32 - Server and Client Components

### Learning Objectives

- Understand Server and Client Components.
- Use the "use client" directive correctly.
- Isolate interactive user interface components.
- Pass serializable props across boundaries.
- Reduce unnecessary client-side JavaScript.
- Protect server-only information.

### Component Architecture

| Component | Type | Responsibility |
| --- | --- | --- |
| ProductsPage | Server | Render product data |
| QuantitySelector | Client | Manage interactive quantity |
| products.ts | Data module | Provide product information |

### Quantity Selector

The Product Catalog includes an interactive
quantity selector for each available product.

Features:

- Increase and decrease quantity.
- Prevent quantities below one.
- Prevent quantities above available stock.
- Handle out-of-stock products.
- Calculate estimated total dynamically.
- Format prices using Intl.NumberFormat.
- Accessible buttons and live status updates.

### Data Flow

    Product data
         |
    ProductsPage (Server)
         |
    Serializable props
         |
    QuantitySelector (Client)
         |
    State and user interactions

The Server Component passes productName, price
and stock to the Client Component.

The Client Component manages quantity using
useState and calculates the estimated total.

### Boundary Experiment

Temporarily making ProductsPage a Client
Component demonstrated that interactivity
still works with a larger client boundary.

Removing that unnecessary boundary allows
ProductsPage to remain a Server Component.

QuantitySelector retains its "use client"
directive because it requires state and events.

### Manual Test Scenarios

| Scenario | Expected Result |
| --- | --- |
| Increase quantity | Quantity and total increase |
| Decrease quantity | Quantity and total decrease |
| Minimum quantity | Decrease button disabled |
| Maximum stock | Increase button disabled |
| Zero stock | Out-of-stock message |
| Multiple products | Independent component state |
| Server boundary restored | Interactivity preserved |

The quantity selector is a demonstration
estimate only, not a checkout system.

## Day 33 - Server-Side Data Fetching

### Learning Objectives

- Fetch external API data in Server Components.
- Use asynchronous pages and route parameters.
- Validate external JSON at runtime.
- Handle loading, empty and error states.
- Distinguish missing resources from failed requests.

### External API

Provider: DummyJSON

Endpoints:

- https://dummyjson.com/products?limit=6
- https://dummyjson.com/products/:id

### Application Routes

| Route | Purpose |
| --- | --- |
| /remote-products | Remote product catalog |
| /remote-products/:id | Remote product details |

### File Structure

    src/
    |-- app/
    |   |-- remote-products/
    |       |-- page.tsx
    |       |-- loading.tsx
    |       |-- error.tsx
    |       |-- not-found.tsx
    |       |-- [id]/
    |           |-- page.tsx
    |-- data/
        |-- remoteProducts.ts

### Data Flow

    Browser Request
          |
    Async Server Component
          |
    Remote Product Service
          |
    DummyJSON API
          |
    Runtime Validation
          |
    Typed View Model
          |
    Rendered UI

Data is fetched on the server to keep
data retrieval separate from browser
interactivity.

### Runtime Validation

External JSON is initially treated as unknown.

Validation checks:

- Valid product object.
- Positive integer ID.
- Non-empty product title.
- Finite non-negative price.
- Non-negative integer stock.
- String description.
- Valid products array.
- Matching detail response ID.

The external title field is mapped to
the internal name property.

### Request Handling

- Check HTTP response status.
- Use cache: no-store for fresh data.
- Apply a ten-second request timeout.
- Return null for invalid or missing IDs.
- Throw errors for failed or malformed responses.

### UI States

| State | Implementation |
| --- | --- |
| Success | Render validated products |
| Loading | loading.tsx |
| Empty | Display an empty catalog message |
| Error | error.tsx |
| Not found | not-found.tsx |

The error boundary is a Client Component.
Its retry button reloads the current page.

### Reproducible Test Scenarios

| Scenario | Expected Result |
| --- | --- |
| Normal request | Remote products displayed |
| scenario=slow | Loading UI |
| scenario=empty | Empty catalog |
| scenario=error | Error boundary |
| scenario=invalid | Validation failure |
| Valid product ID | Product details |
| Unknown product ID | Not-found UI |
| Malformed ID | Not-found UI |

The slow, empty, error and invalid scenarios
are intentional learning simulations.

Normal requests depend on external API
availability and an internet connection.

Existing local inventory routes and the
Day 32 QuantitySelector remain unchanged.

## Day 34 - Route Handlers and Proxy

### NotesLab

NotesLab demonstrates frontend and backend
integration using Next.js Route Handlers.

### Features

- Internal GET and POST endpoints.
- Typed note model.
- Runtime request validation.
- Consistent JSON response structure.
- HTTP status code handling.
- Demo write-access verification.
- Interactive note creation form.
- Loading, pending, success and error feedback.
- Narrow Proxy redirect rule.

### API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | /api/notes | List notes |
| GET | /api/notes?id=1 | Retrieve a note |
| POST | /api/notes | Create a note |

### HTTP Status Codes

| Code | Meaning |
| --- | --- |
| 200 | Successful retrieval |
| 201 | Resource created |
| 400 | Invalid input or malformed JSON |
| 401 | Invalid or missing credentials |
| 404 | Note not found |
| 415 | Unsupported content type |
| 503 | Demo write access unavailable |

### Architecture

    Browser
       |
    NotesLab Client Component
       |
    GET / POST Route Handler
       |
    Authorization and Input Validation
       |
    In-memory Note Collection
       |
    JSON Response
       |
    React State Update

### File Structure

    src/
    |-- app/
    |   |-- api/
    |   |   |-- notes/
    |   |       |-- route.ts
    |   |-- notes-lab/
    |       |-- page.tsx
    |-- lib/
    |   |-- notes.ts
    |-- proxy.ts

### Local Configuration

Configure NEXTLAB_DEMO_WRITE_KEY in the
server environment before starting NextLab.

The credential is a local educational
demonstration, not production authentication.

Do not commit real credentials or environment
files containing secrets.

### Request Validation

- Title: 3-80 characters.
- Content: 1-300 characters.
- Request body must contain valid JSON.
- Content type must be application/json.
- Note IDs must be positive safe integers.

Client-side checks do not replace server
validation.

### Proxy

The Proxy matches /legacy-notes and redirects
GET and HEAD requests to /notes-lab.

Proxy is not a complete authorization system.
Protected write operations verify credentials
inside the Route Handler.

### Testing

Test scenarios cover successful GET and POST,
invalid IDs, missing resources, unauthorized
requests, malformed JSON, invalid input,
unsupported content types and Proxy redirects.

### Limitations

- Notes use temporary in-memory storage.
- Data may be lost on restart.
- No persistent database.
- No production authentication or sessions.
- Intended for local learning only.

Existing Day 31-33 functionality is preserved.

## Current Limitations

- Local inventory uses fictional data; remote inventory uses an external demonstration API.
- No database integration.
- No authentication.
- No product editing or purchasing.
- Public deployment is not implemented.

## Planned Development

- Advanced caching and revalidation
- Frontend quality improvements
- InsightBoard Next.js migration

## Developer

Developed by Hasitha Gayan.

Part of the AI and Full-Stack Web Development
learning roadmap.
