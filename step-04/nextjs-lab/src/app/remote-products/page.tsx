
import Link from "next/link";

import {
    getRemoteProducts,
    type ProductScenario,
} from "@/data/remoteProducts";

interface RemoteProductsPageProps {
    searchParams: Promise<{
        scenario?: string | string[];
    }>;
}

function getScenario(
    value: string | string[] | undefined
): ProductScenario {
    switch (value) {
        case "slow":
        case "empty":
        case "error":
        case "invalid":
            return value;

        default:
            return "normal";
    }
}

export default async function RemoteProductsPage({
    searchParams,
}: RemoteProductsPageProps) {

    const { scenario: requestedScenario } =
        await searchParams;

    const scenario = getScenario(
        requestedScenario
    );

    const products = await getRemoteProducts(
        scenario
    );

    return (
        <section>
            <h1>Remote Product Catalog</h1>

            <p>
                Browse products retrieved from
                an external REST API.
            </p>

            <div className="card">
                <h2>Day 33 Test Controls</h2>

                <Link
                    href="/remote-products"
                    className="button"
                    prefetch={false}
                >
                    Normal
                </Link>

                <Link
                    href="/remote-products?scenario=slow"
                    className="button"
                    prefetch={false}
                >
                    Slow Request
                </Link>

                <Link
                    href="/remote-products?scenario=empty"
                    className="button"
                    prefetch={false}
                >
                    Empty Data
                </Link>

                <Link
                    href="/remote-products?scenario=error"
                    className="button"
                    prefetch={false}
                >
                    API Failure
                </Link>

                <Link
                    href="/remote-products?scenario=invalid"
                    className="button"
                    prefetch={false}
                >
                    Invalid Data
                </Link>
            </div>

            {products.length === 0 ? (
                <article
                    className="card"
                    role="status"
                >
                    <h2>No products available</h2>

                    <p>
                        The request succeeded, but
                        no products were returned.
                    </p>

                    <Link
                        href="/remote-products"
                        className="button"
                    >
                        Reload Catalog
                    </Link>
                </article>
            ) : (
                <div className="card-grid">
                    {products.map(product => (
                        <article
                            className="card"
                            key={product.id}
                        >
                            <h2>{product.name}</h2>

                            <p>
                                Price: $
                                {product.price.toFixed(2)}
                            </p>

                            <p>
                                Stock: {product.stock} units
                            </p>

                            <Link
                                href={`/remote-products/${product.id}`}
                                className="button"
                                prefetch={false}
                            >
                                View Details
                            </Link>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}
