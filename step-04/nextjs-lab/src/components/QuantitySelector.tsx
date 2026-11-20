
"use client";

import { useState } from "react";

import styles from "./QuantitySelector.module.css";

interface QuantitySelectorProps {
    productName: string;
    price: number;
    stock: number;
}

const currencyFormatter = new Intl.NumberFormat(
    "en-US",
    {
        style: "currency",
        currency: "USD",
    }
);

export default function QuantitySelector({
    productName,
    price,
    stock,
}: QuantitySelectorProps) {
    const [quantity, setQuantity] = useState(
        stock > 0 ? 1 : 0
    );

    function increaseQuantity() {
        setQuantity(previous =>
            Math.min(stock, previous + 1)
        );
    }

    function decreaseQuantity() {
        setQuantity(previous =>
            Math.max(1, previous - 1)
        );
    }

    const estimatedTotal = price * quantity;

    if (stock <= 0) {
        return (
            <p className={styles.unavailable}>
                Currently out of stock.
            </p>
        );
    }

    return (
        <div className={styles.selector}>
            <p className={styles.label}>
                Estimate quantity
            </p>

            <div
                className={styles.controls}
                role="group"
                aria-label={`${productName} quantity`}
            >
                <button
                    type="button"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    aria-label={`Decrease ${productName} quantity`}
                >
                    −
                </button>

                <span className={styles.quantity}>
                    {quantity}
                </span>

                <button
                    type="button"
                    onClick={increaseQuantity}
                    disabled={quantity >= stock}
                    aria-label={`Increase ${productName} quantity`}
                >
                    +
                </button>
            </div>

            <div
                className={styles.total}
                role="status"
                aria-live="polite"
                aria-atomic="true"
            >
                <span>
                    {quantity} {quantity === 1 ? "unit" : "units"}
                </span>

                <strong>
                    {currencyFormatter.format(estimatedTotal)}
                </strong>
            </div>

            <p className={styles.hint}>
                {quantity === stock
                    ? "Maximum available stock reached."
                    : `${stock} units available.`}
            </p>

            <p className={styles.hint}>
                Demonstration estimate only.
            </p>
        </div>
    );
}
