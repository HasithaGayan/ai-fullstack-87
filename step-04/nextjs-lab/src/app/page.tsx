
import Link from "next/link";

export default function HomePage() {
    return (
        <section>
            <h1>Welcome to NextLab</h1>

            <p>
                Learn professional Next.js application
                architecture with TypeScript.
            </p>

            <div className="card">
                <h2>App Router Fundamentals</h2>

                <p>
                    Explore file-based routing, shared
                    layouts and dynamic product pages.
                </p>

                <Link
                    href="/products"
                    className="button"
                >
                    Browse Products
                </Link>

                <Link
                    href="/dashboard"
                    className="button"
                >
                    View Dashboard
                </Link>
            </div>
        </section>
    );
}
