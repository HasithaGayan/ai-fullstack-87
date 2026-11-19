
import { products } from "@/data/products";

export default function DashboardPage() {
    const totalUnits = products.reduce(
        (total, product) =>
            total + product.quantity,
        0
    );

    const inventoryValue = products.reduce(
        (total, product) =>
            total + product.price * product.quantity,
        0
    );

    const outOfStock = products.filter(
        product => product.quantity === 0
    ).length;

    return (
        <section>
            <h1>Dashboard Overview</h1>

            <p>Summary of our demonstration inventory.</p>

            <div className="card-grid">
                <article className="card">
                    <h2>Total Products</h2>
                    <strong>{products.length}</strong>
                </article>

                <article className="card">
                    <h2>Units in Stock</h2>
                    <strong>{totalUnits}</strong>
                </article>

                <article className="card">
                    <h2>Inventory Value</h2>
                    <strong>
                        ${inventoryValue.toLocaleString("en-US")}
                    </strong>
                </article>

                <article className="card">
                    <h2>Out of Stock</h2>
                    <strong>{outOfStock}</strong>
                </article>
            </div>
        </section>
    );
}
