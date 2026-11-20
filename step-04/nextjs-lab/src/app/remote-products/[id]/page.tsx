
import Link from "next/link";
import { notFound } from "next/navigation";

import {
    getRemoteProductById,
} from "@/data/remoteProducts";

interface RemoteProductDetailsProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function RemoteProductDetailsPage({
    params,
}: RemoteProductDetailsProps) {

    const { id } = await params;

    const product = await getRemoteProductById(id);

    if (!product) {
        notFound();
    }

    return (
        <section>
            <h1>Remote Product Details</h1>

            <article className="card">
                <h2>{product.name}</h2>

                <p>Product ID: #{product.id}</p>

                <p>{product.description}</p>

                <p>
                    Price: ${product.price.toFixed(2)}
                </p>

                <p>
                    Available stock: {product.stock} units
                </p>

                <Link
                    href="/remote-products"
                    className="button"
                >
                    Back to Remote Products
                </Link>
            </article>
        </section>
    );
}
