
export interface Note {
    id: number;
    title: string;
    content: string;
}

export interface CreateNoteInput {
    title: string;
    content: string;
}

export function isRecord(
    value: unknown
): value is Record<string, unknown> {
    return (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
    );
}

export function isNote(
    value: unknown
): value is Note {
    return (
        isRecord(value) &&
        typeof value.id === "number" &&
        Number.isSafeInteger(value.id) &&
        value.id > 0 &&
        typeof value.title === "string" &&
        typeof value.content === "string"
    );
}

export function isNoteList(
    value: unknown
): value is Note[] {
    return (
        Array.isArray(value) &&
        value.every(isNote)
    );
}

export function parseNoteInput(
    value: unknown
): CreateNoteInput | null {
    if (
        !isRecord(value) ||
        typeof value.title !== "string" ||
        typeof value.content !== "string"
    ) {
        return null;
    }

    const title = value.title.trim();
    const content = value.content.trim();

    if (
        title.length < 3 ||
        title.length > 80 ||
        content.length < 1 ||
        content.length > 300
    ) {
        return null;
    }

    return { title, content };
}
