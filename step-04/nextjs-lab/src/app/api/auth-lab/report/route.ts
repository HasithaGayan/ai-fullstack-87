
import { getSession } from "@/lib/auth-session";

export async function GET() {
    const session = await getSession();

    const headers = {
        "Cache-Control": "no-store",
    };

    if (!session) {
        return Response.json(
            {
                ok: false,
                error: "Authentication required.",
            },
            {
                status: 401,
                headers,
            }
        );
    }

    if (session.role !== "admin") {
        return Response.json(
            {
                ok: false,
                error:
                    "Administrator permission required.",
            },
            {
                status: 403,
                headers,
            }
        );
    }

    return Response.json(
        {
            ok: true,
            data: {
                totalUsers: 120,
                activeProjects: 15,
                reportType:
                    "Administrative Report",
            },
        },
        {
            status: 200,
            headers,
        }
    );
}
