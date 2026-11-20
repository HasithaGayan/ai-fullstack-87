
import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth-session";

import { signIn } from "./actions";

interface LoginPageProps {
    searchParams: Promise<{
        error?: string;
        message?: string;
    }>;
}

export default async function AuthLabPage({
    searchParams,
}: LoginPageProps) {

    const session = await getSession();

    if (session) {
        redirect("/auth-lab/dashboard");
    }

    const {
        error,
        message,
    } = await searchParams;

    return (
        <section>
            <h1>AuthLab</h1>

            <p>
                Day 35 - Authentication,
                Sessions and Authorization
            </p>

            <article
                className="card"
                style={{ maxWidth: 480 }}
            >
                <h2>Sign In</h2>

                <form
                    action={signIn}
                    style={{
                        display: "grid",
                        gap: 12,
                    }}
                >
                    <label htmlFor="email">
                        Email Address
                    </label>

                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="username"
                        required
                        style={{ padding: 12 }}
                    />

                    <label htmlFor="password">
                        Password
                    </label>

                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        maxLength={128}
                        style={{ padding: 12 }}
                    />

                    <button
                        type="submit"
                        className="button"
                    >
                        Sign In
                    </button>
                </form>

                {error === "invalid" && (
                    <p
                        role="alert"
                        style={{ color: "#f87171" }}
                    >
                        Invalid email or password.
                    </p>
                )}

                {error === "config" && (
                    <p role="alert">
                        Demo authentication is
                        not configured.
                    </p>
                )}

                {message === "required" && (
                    <p role="status">
                        Please sign in to continue.
                        Your session may have expired.
                    </p>
                )}

                {message === "logout" && (
                    <p
                        role="status"
                        style={{ color: "#4ade80" }}
                    >
                        Signed out successfully.
                    </p>
                )}
            </article>
        </section>
    );
}
