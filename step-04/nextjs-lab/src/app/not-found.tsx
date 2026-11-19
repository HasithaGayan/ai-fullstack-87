
import Link from "next/link";

export default function NotFoundPage() {
    return (
        <section className="card">
            <h1>404 — Page Not Found</h1>

            <p>
                The requested page or product
                could not be found.
            </p>

            <Link href="/" className="button">
                Return Home
            </Link>

            <Link
                href="/products"
                className="button"
            >
                Browse Products
            </Link>
        </section>
    );
}
