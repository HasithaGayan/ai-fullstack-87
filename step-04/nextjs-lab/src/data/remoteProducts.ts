
export interface RemoteProduct {
    id: number;
    name: string;
    price: number;
    stock: number;
    description: string;
}

export type ProductScenario =
    | "normal"
    | "slow"
    | "empty"
    | "error"
    | "invalid";

const API_URL = "https://dummyjson.com/products";

function isRecord(
    value: unknown
): value is Record<string, unknown> {
    return (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
    );
}

function parseProduct(
    value: unknown
): RemoteProduct {
    if (!isRecord(value)) {
        throw new Error("Invalid product object.");
    }

    const {
        id,
        title,
        price,
        stock,
        description,
    } = value;

    if (
        typeof id !== "number" ||
        !Number.isSafeInteger(id) ||
        id <= 0 ||
        typeof title !== "string" ||
        title.trim() === "" ||
        typeof price !== "number" ||
        !Number.isFinite(price) ||
        price < 0 ||
        typeof stock !== "number" ||
        !Number.isSafeInteger(stock) ||
        stock < 0 ||
        typeof description !== "string"
    ) {
        throw new Error(
            "Invalid product response fields."
        );
    }

    return {
        id,
        name: title,
        price,
        stock,
        description,
    };
}

function parseProductList(
    value: unknown
): RemoteProduct[] {
    if (
        !isRecord(value) ||
        !Array.isArray(value.products)
    ) {
        throw new Error(
            "Invalid product list response."
        );
    }

    return value.products.map(parseProduct);
}

export async function getRemoteProducts(
    scenario: ProductScenario = "normal"
): Promise<RemoteProduct[]> {

    // Controlled loading-state demonstration.
    if (scenario === "slow") {
        await new Promise<void>(resolve => {
            setTimeout(resolve, 3000);
        });
    }

    // Simulate a successful empty response.
    if (scenario === "empty") {
        return parseProductList({
            products: [],
        });
    }

    // Simulate an API failure.
    if (scenario === "error") {
        throw new Error(
            "Simulated API request failure."
        );
    }

    // Simulate malformed external data.
    if (scenario === "invalid") {
        return parseProductList({
            products: [
                {
                    id: 1,
                    title: "Invalid Product",
                    price: "incorrect",
                },
            ],
        });
    }

    const response = await fetch(
        `${API_URL}?limit=6`,
        {
            cache: "no-store",
            signal: AbortSignal.timeout(10000),
        }
    );

    if (!response.ok) {
        throw new Error(
            `Product request failed: ${response.status}`
        );
    }

    const data: unknown = await response.json();

    return parseProductList(data);
}

export async function getRemoteProductById(
    id: string
): Promise<RemoteProduct | null> {

    const numericId = Number(id);

    // Reject malformed route parameters.
    if (
        !/^[1-9]\d*$/.test(id) ||
        !Number.isSafeInteger(numericId)
    ) {
        return null;
    }

    const response = await fetch(
        `${API_URL}/${id}`,
        {
            cache: "no-store",
            signal: AbortSignal.timeout(10000),
        }
    );

    // A missing product is not a network failure.
    if (response.status === 404) {
        return null;
    }

    if (!response.ok) {
        throw new Error(
            `Product request failed: ${response.status}`
        );
    }

    const data: unknown = await response.json();

    const product = parseProduct(data);

    if (product.id !== numericId) {
        throw new Error("Product ID mismatch.");
    }

    return product;
}
