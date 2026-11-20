"use client";

import Link from "next/link";

export default function RemoteProductsError() {
    return (
        <section
            className="card"
            role="alert"
        >
            <h1>Unable to load products</h1>

            <p>
                Something went wrong while
                retrieving product information.
            </p>

            <p>
                Please try again or return
                to the normal product catalog.
            </p>

            <button
                type="button"
                className="button"
                onClick={() => window.location.reload()}
            >
                Try Again
            </button>

            <Link
                href="/remote-products"
                className="button"
                prefetch={false}
            >
                Return to Catalog
            </Link>

            <Link
                href="/"
                className="button"
            >
                Return Home
            </Link>
        </section>
    );
}