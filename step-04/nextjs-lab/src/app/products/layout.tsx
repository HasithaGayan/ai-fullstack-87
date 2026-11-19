
import type { ReactNode } from "react";
import Link from "next/link";

export default function ProductsLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <section>
            <div className="sub-navigation">
                <Link href="/products">
                    Product Catalog
                </Link>

                <span>Inventory Management</span>
            </div>

            {children}
        </section>
    );
}
