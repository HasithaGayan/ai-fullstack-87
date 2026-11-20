
import {
    type Project,
    type FieldErrors,
    validateProject,
} from "@/lib/form-projects";

export const dynamic = "force-dynamic";

let projects: Project[] = [
    {
        id: 1,
        name: "Developer Portfolio",
        priority: "High",
    },
    {
        id: 2,
        name: "Analytics Dashboard",
        priority: "Medium",
    },
];

let nextId = 3;

function success(
    data: Project | Project[],
    status = 200
) {
    return Response.json(
        {
            ok: true,
            data,
        },
        {
            status,
            headers: {
                "Cache-Control": "no-store",
            },
        }
    );
}

function failure(
    status: number,
    message: string,
    fieldErrors: FieldErrors = {}
) {
    const headers: Record<string, string> = {
        "Cache-Control": "no-store",
    };

    if (status === 401) {
        headers["WWW-Authenticate"] =
            'Bearer realm="FormLab"';
    }

    return Response.json(
        {
            ok: false,
            error: {
                message,
                fieldErrors,
            },
        },
        {
            status,
            headers,
        }
    );
}

function authorize(request: Request) {

    const key =
        process.env.NEXTLAB_DEMO_WRITE_KEY;

    if (!key) {
        return failure(
            503,
            "Demo write access is not configured."
        );
    }

    if (
        request.headers.get("authorization") !==
        `Bearer ${key}`
    ) {
        return failure(
            401,
            "A valid demo write key is required."
        );
    }

    return null;
}

async function readInput(request: Request) {

    const contentType = request.headers
        .get("content-type")
        ?.split(";")[0]
        .trim()
        .toLowerCase();

    if (contentType !== "application/json") {
        return {
            ok: false as const,
            response: failure(
                415,
                "Content-Type must be application/json."
            ),
        };
    }

    let body: unknown;

    try {
        body = await request.json();
    } catch {
        return {
            ok: false as const,
            response: failure(
                400,
                "Malformed JSON."
            ),
        };
    }

    const result = validateProject(body);

    if (!result.ok) {
        return {
            ok: false as const,
            response: failure(
                400,
                "Correct the invalid fields.",
                result.errors
            ),
        };
    }

    return {
        ok: true as const,
        data: result.data,
    };
}

export async function GET() {
    return success(projects);
}

export async function POST(
    request: Request
) {
    const denied = authorize(request);

    if (denied) {
        return denied;
    }

    const result = await readInput(request);

    if (!result.ok) {
        return result.response;
    }

    const project: Project = {
        id: nextId++,
        ...result.data,
    };

    projects = [...projects, project];

    return success(project, 201);
}

export async function PATCH(
    request: Request
) {
    const denied = authorize(request);

    if (denied) {
        return denied;
    }

    const rawId =
        new URL(request.url)
            .searchParams.get("id");

    if (
        !rawId ||
        !/^[1-9]\d*$/.test(rawId) ||
        !Number.isSafeInteger(Number(rawId))
    ) {
        return failure(
            400,
            "A valid project ID is required."
        );
    }

    const id = Number(rawId);

    if (!projects.some(p => p.id === id)) {
        return failure(
            404,
            "Project not found."
        );
    }

    const result = await readInput(request);

    if (!result.ok) {
        return result.response;
    }

    const updated: Project = {
        id,
        ...result.data,
    };

    projects = projects.map(project =>
        project.id === id
            ? updated
            : project
    );

    return success(updated);
}
