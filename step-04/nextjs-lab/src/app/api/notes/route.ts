
import {
    parseNoteInput,
    type Note,
} from "@/lib/notes";

export const dynamic = "force-dynamic";

const notes: Note[] = [
    {
        id: 1,
        title: "Learn Route Handlers",
        content:
            "Understand GET and POST endpoints.",
    },
    {
        id: 2,
        title: "Practice TypeScript",
        content:
            "Validate incoming request data.",
    },
];

let nextId = 3;

function success(
    data: Note | Note[],
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
    code: string,
    message: string
) {
    const headers = new Headers({
        "Cache-Control": "no-store",
    });

    if (status === 401) {
        headers.set(
            "WWW-Authenticate",
            'Bearer realm="NotesLab"'
        );
    }

    return Response.json(
        {
            ok: false,
            error: {
                code,
                message,
            },
        },
        { status, headers }
    );
}

export async function GET(
    request: Request
) {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    // Return the complete collection.
    if (id === null) {
        return success(notes);
    }

    const numericId = Number(id);

    // Reject invalid identifiers.
    if (
        !/^[1-9]\d*$/.test(id) ||
        !Number.isSafeInteger(numericId)
    ) {
        return failure(
            400,
            "INVALID_ID",
            "A positive integer ID is required."
        );
    }

    const note = notes.find(
        item => item.id === numericId
    );

    if (!note) {
        return failure(
            404,
            "NOTE_NOT_FOUND",
            "The requested note does not exist."
        );
    }

    return success(note);
}

export async function POST(
    request: Request
) {
    // Local learning-only credential check.
    const expectedKey =
        process.env.NEXTLAB_DEMO_WRITE_KEY;

    if (!expectedKey) {
        return failure(
            503,
            "WRITE_ACCESS_UNAVAILABLE",
            "Demo write access is not configured."
        );
    }

    const authorization =
        request.headers.get("authorization");

    if (
        authorization !== `Bearer ${expectedKey}`
    ) {
        return failure(
            401,
            "UNAUTHORIZED",
            "A valid demo access key is required."
        );
    }

    const contentType = request.headers
        .get("content-type")
        ?.split(";")[0]
        .trim()
        .toLowerCase();

    if (contentType !== "application/json") {
        return failure(
            415,
            "UNSUPPORTED_MEDIA_TYPE",
            "Use application/json."
        );
    }

    let body: unknown;

    try {
        body = await request.json();
    } catch {
        return failure(
            400,
            "INVALID_JSON",
            "The request contains malformed JSON."
        );
    }

    const input = parseNoteInput(body);

    if (!input) {
        return failure(
            400,
            "INVALID_INPUT",
            "Title must contain 3-80 characters and content 1-300 characters."
        );
    }

    const note: Note = {
        id: nextId++,
        title: input.title,
        content: input.content,
    };

    notes.push(note);

    return success(note, 201);
}
