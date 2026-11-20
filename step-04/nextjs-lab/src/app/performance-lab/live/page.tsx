
import type { Metadata } from "next";

import Link from "next/link";

import {
    getLiveSnapshot,
} from "@/lib/performance";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Live Inventory | NextLab",

    description:
        "Compare request-time rendering with cached inventory data.",

    robots: {
        index: false,
        follow: false,
    },
};

export default async function LiveInventoryPage() {
    const snapshot =
        await getLiveSnapshot();

    return (
        <section>
            <h1>Live Inventory</h1>

            <p>
                Request-time rendering without
                our inventory Data Cache.
            </p>

            <article className="card">
                <h2>Fresh Inventory Snapshot</h2>

                <p>
                    Data generated:
                    {" "}{snapshot.generatedAt}
                </p>

                <p>
                    Refresh this page to generate
                    another snapshot.
                </p>
            </article>

            <div className="card-grid">
                <article className="card">
                    <h2>Total Products</h2>
                    <strong>
                        {snapshot.totalProducts}
                    </strong>
                </article>

                <article className="card">
                    <h2>Units in Stock</h2>
                    <strong>
                        {snapshot.totalStock}
                    </strong>
                </article>

                <article className="card">
                    <h2>Inventory Value</h2>
                    <strong>
                        ${snapshot.inventoryValue.toLocaleString("en-US")}
                    </strong>
                </article>
            </div>

            <Link
                href="/performance-lab"
                className="button"
                prefetch={false}
            >
                Back to Cached Inventory
            </Link>
        </section>
    );
}
