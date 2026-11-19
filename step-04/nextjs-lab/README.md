
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

## Current Limitations

- Product data is fictional and local.
- No database integration.
- No authentication.
- No product editing or purchasing.
- Public deployment is not implemented.

## Planned Development

- Server and Client Component boundaries
- Data fetching and caching
- Loading and error handling
- Frontend quality improvements
- InsightBoard Next.js migration

## Developer

Developed by Hasitha Gayan.

Part of the AI and Full-Stack Web Development
learning roadmap.
