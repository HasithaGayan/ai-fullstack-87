
import "server-only";

import { unstable_cache } from "next/cache";

import { products } from "@/data/products";

export interface InventorySnapshot {
    totalProducts: number;
    totalStock: number;
    inventoryValue: number;
    generatedAt: string;
}

export async function getLiveSnapshot():
    Promise<InventorySnapshot> {

    console.log(
        "[PerformanceLab] Generating inventory snapshot"
    );

    return {
        totalProducts: products.length,

        totalStock: products.reduce(
            (total, product) =>
                total + product.quantity,
            0
        ),

        inventoryValue: products.reduce(
            (total, product) =>
                total +
                product.price * product.quantity,
            0
        ),

        generatedAt: new Date().toISOString(),
    };
}

export const getCachedSnapshot = unstable_cache(
    getLiveSnapshot,
    ["nextlab-public-inventory-v1"],
    {
        revalidate: 60,
        tags: ["public-inventory"],
    }
);
