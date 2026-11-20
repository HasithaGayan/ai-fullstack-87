import Link from "next/link";

import { products } from "@/data/products";
import QuantitySelector from "@/components/QuantitySelector";

export default function ProductsPage() {
    return (
        <>
            <h1>Product Catalog</h1>

            <p>Browse our demonstration inventory.</p>

            <div className="card-grid">
                {products.map(product => (
                    <article
                        className="card"
                        key={product.id}
                    >
                        <h2>{product.name}</h2>

                        <p>Price: ${product.price}</p>

                        <p>
                            Stock: {product.quantity} units
                        </p>

                        <QuantitySelector
                            productName={product.name}
                            price={product.price}
                            stock={product.quantity}
                        />

                        <Link
                            className="button"
                            href={`/products/${product.id}`}
                        >
                            View Details
                        </Link>
                    </article>
                ))}
            </div>
        </>
    );
}