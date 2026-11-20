
export default function Loading() {
    return (
        <section
            role="status"
            aria-live="polite"
            aria-busy="true"
        >
            <h1>Loading products...</h1>

            <p>
                Please wait while we retrieve
                the latest product information.
            </p>

            <div
                className="card-grid"
                aria-hidden="true"
            >
                {Array.from(
                    { length: 6 },
                    (_, index) => (
                        <article
                            className="card"
                            key={index}
                        >
                            <h2>Loading...</h2>

                            <p>
                                Retrieving product data...
                            </p>

                            <p>Please wait.</p>
                        </article>
                    )
                )}
            </div>
        </section>
    );
}
