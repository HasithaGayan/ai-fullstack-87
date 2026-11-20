
import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth-session";

import { signOut } from "../actions";

export default async function DashboardPage() {
    const session = await getSession();

    if (!session) {
        redirect(
            "/auth-lab?message=required"
        );
    }

    return (
        <section>
            <h1>Protected Dashboard</h1>

            <article className="card">
                <h2>Authenticated Successfully</h2>

                <p>Email: {session.email}</p>

                <p>
                    Role: {session.role.toUpperCase()}
                </p>

                <p>
                    Session expires:{" "}
                    {new Date(
                        session.expiresAt
                    ).toISOString()}
                </p>

                <form action={signOut}>
                    <button
                        type="submit"
                        className="button"
                    >
                        Sign Out
                    </button>
                </form>
            </article>

            <div className="card-grid">
                <article className="card">
                    <h2>Account Status</h2>
                    <strong>Active</strong>
                </article>

                <article className="card">
                    <h2>Permission Level</h2>

                    <strong>
                        {session.role === "admin"
                            ? "Admin"
                            : "Student"}
                    </strong>
                </article>
            </div>

            {session.role === "admin" ? (
                <article
                    className="card"
                    style={{ marginTop: 20 }}
                >
                    <h2>Administrator Access</h2>

                    <p>
                        You can access the
                        protected administrative
                        report.
                    </p>

                    <a
                        href="/api/auth-lab/report"
                        className="button"
                    >
                        View Admin Report
                    </a>
                </article>
            ) : (
                <article
                    className="card"
                    style={{ marginTop: 20 }}
                >
                    <h2>Student Access</h2>

                    <p>
                        You may access your
                        dashboard, but you
                        cannot access administrator
                        reports.
                    </p>
                </article>
            )}
        </section>
    );
}
