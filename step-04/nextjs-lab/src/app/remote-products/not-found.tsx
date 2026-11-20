
import Link from "next/link";

export default function RemoteProductNotFound() {
    return (
        <section className="card">
            <h1>404 - Product Not Found</h1>

            <p>
                The requested remote product
                does not exist or has an invalid ID.
            </p>

            <Link
                href="/remote-products"
                className="button"
            >
                Back to Remote Products
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
