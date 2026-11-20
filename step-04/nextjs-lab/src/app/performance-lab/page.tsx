
import type { Metadata } from "next";

import Image from "next/image";
import Link from "next/link";

import { connection } from "next/server";

import {
    getCachedSnapshot,
} from "@/lib/performance";

const title =
    "PerformanceLab | NextLab";

const description =
    "Explore Next.js caching, inventory analytics and responsive image optimization.";

const publicOrigin =
    process.env.NEXTLAB_PUBLIC_ORIGIN;

const canonical = publicOrigin
    ? new URL(
        "/performance-lab",
        publicOrigin
    ).toString()
    : undefined;

export const metadata: Metadata = {
    title,

    description,

    robots: {
        index: false,
        follow: false,
    },

    alternates: canonical
        ? { canonical }
        : undefined,

    openGraph: {
        title,
        description,
        type: "website",

        ...(canonical
            ? {
                url: canonical,
                images: [
                    {
                        url: new URL(
                            "/images/workspace.jpg",
                            canonical
                        ).toString(),
                        alt: "Laptop on a workspace desk",
                    },
                ],
            }
            : {}),
    },

    twitter: {
        card: "summary",
        title,
        description,
    },
};

interface PerformancePageProps {
    searchParams: Promise<{
        image?: string | string[];
    }>;
}

export default async function PerformancePage({
    searchParams,
}: PerformancePageProps) {

    // Render this page on each request,
    // while allowing explicit data caching.
    await connection();

    const { image } = await searchParams;

    const rawImage = image === "raw";

    const snapshot =
        await getCachedSnapshot();

    const renderedAt =
        new Date().toISOString();

    return (
        <section>
            <h1>PerformanceLab</h1>

            <p>
                Day 36 - Data Caching,
                Metadata and Image Optimization
            </p>

            <article className="card">
                <h2>Cached Inventory Snapshot</h2>

                <p>
                    Revalidation interval:
                    60 seconds
                </p>

                <p>
                    Data generated:
                    {" "}{snapshot.generatedAt}
                </p>

                <p>
                    Page rendered:
                    {" "}{renderedAt}
                </p>

                <Link
                    href="/performance-lab/live"
                    className="button"
                    prefetch={false}
                >
                    View Live Data
                </Link>
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

            <article
                className="card"
                style={{ marginTop: 24 }}
            >
                <h2>Image Optimization</h2>

                <p>
                    Current mode:
                    {" "}
                    {rawImage
                        ? "Original image"
                        : "Next.js optimized image"}
                </p>

                <Image
                    src="/images/workspace.jpg"
                    alt="Laptop on a workspace desk"
                    width={3165}
                    height={2334}
                    sizes="(max-width: 640px) 90vw, 560px"
                    unoptimized={rawImage}
                    loading="eager"
                    style={{
                        width: "100%",
                        maxWidth: 560,
                        height: "auto",
                        borderRadius: 12,
                    }}
                />

                <p>
                    Photo by Radek Grzybowski,
                    Wikimedia Commons (CC0).
                </p>

                <Link
                    href="/performance-lab"
                    className="button"
                    prefetch={false}
                >
                    Optimized Image
                </Link>

                <Link
                    href="/performance-lab?image=raw"
                    className="button"
                    prefetch={false}
                >
                    Original Image
                </Link>
            </article>
        </section>
    );
}
