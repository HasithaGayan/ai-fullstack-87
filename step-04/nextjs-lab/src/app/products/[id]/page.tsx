
import Link from "next/link";
import { notFound } from "next/navigation";

import { getProductById } from "@/data/products";

interface ProductDetailsProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function ProductDetailsPage({
    params,
}: ProductDetailsProps) {
    const { id } = await params;

    const product = getProductById(id);

    if (!product) {
        notFound();
    }

    return (
        <>
            <h1>Product Details</h1>

            <article className="card">
                <h2>{product.name}</h2>

                <p>Product ID: #{product.id}</p>

                <p>{product.description}</p>

                <p>Price: ${product.price}</p>

                <p>
                    Available stock: {product.quantity}
                </p>

                <Link
                    href="/products"
                    className="button"
                >
                    Back to Products
                </Link>
            </article>
        </>
    );
}
