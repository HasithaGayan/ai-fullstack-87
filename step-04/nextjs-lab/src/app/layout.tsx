
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

import "./globals.css";

export const metadata: Metadata = {
    title: "NextLab",
    description: "Next.js App Router Learning Workspace",
};

interface RootLayoutProps {
    children: ReactNode;
}

export default function RootLayout({
    children,
}: RootLayoutProps) {
    return (
        <html lang="en">
            <body>
                <header className="site-header">
                    <Link href="/" className="brand">
                        NextLab
                    </Link>

                    <p>
                        Next.js App Router Learning Workspace
                    </p>

                    <nav aria-label="Main navigation">
                        <Link href="/">Home</Link>
                        <Link href="/products">Products</Link>
                        <Link href="/dashboard">Dashboard</Link>
                    </nav>
                </header>

                <main className="container">
                    {children}
                </main>

                <footer className="site-footer">
                    NextLab — Step 4 Learning Project
                </footer>
            </body>
        </html>
    );
}
