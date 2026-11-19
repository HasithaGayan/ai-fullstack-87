
export interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
    description: string;
}

export const products: readonly Product[] = [
    {
        id: 1,
        name: "Laptop",
        price: 850,
        quantity: 3,
        description: "A laptop for everyday productivity.",
    },
    {
        id: 2,
        name: "Mouse",
        price: 25,
        quantity: 10,
        description: "A comfortable wireless mouse.",
    },
    {
        id: 3,
        name: "Keyboard",
        price: 45,
        quantity: 5,
        description: "A keyboard for efficient typing.",
    },
];

export function getProductById(
    id: string
): Product | undefined {
    return products.find(
        product => String(product.id) === id
    );
}
