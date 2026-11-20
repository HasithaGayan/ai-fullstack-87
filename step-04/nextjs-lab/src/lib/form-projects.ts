
export const priorities = [
    "Low",
    "Medium",
    "High",
] as const;

export type Priority =
    typeof priorities[number];

export interface ProjectInput {
    name: string;
    priority: Priority;
}

export interface Project extends ProjectInput {
    id: number;
}

export type FieldErrors = Partial<
    Record<"name" | "priority", string>
>;

type ValidationResult =
    | {
        ok: true;
        data: ProjectInput;
    }
    | {
        ok: false;
        errors: FieldErrors;
    };

export function isRecord(
    value: unknown
): value is Record<string, unknown> {
    return (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
    );
}

export function isPriority(
    value: unknown
): value is Priority {
    return (
        value === "Low" ||
        value === "Medium" ||
        value === "High"
    );
}

export function validateProject(
    input: unknown
): ValidationResult {

    const errors: FieldErrors = {};

    const data = isRecord(input)
        ? input
        : {};

    const name =
        typeof data.name === "string"
            ? data.name.trim()
            : "";

    if (
        name.length < 3 ||
        name.length > 60
    ) {
        errors.name =
            "Project name must contain 3–60 characters.";
    }

    const priority = data.priority;

    if (!isPriority(priority)) {
        errors.priority =
            "Select a valid priority.";
    }

    if (
        errors.name ||
        !isPriority(priority)
    ) {
        return {
            ok: false,
            errors,
        };
    }

    return {
        ok: true,
        data: {
            name,
            priority,
        },
    };
}

export function isProject(
    value: unknown
): value is Project {

    return (
        isRecord(value) &&
        typeof value.id === "number" &&
        Number.isSafeInteger(value.id) &&
        value.id > 0 &&
        typeof value.name === "string" &&
        value.name.trim().length >= 3 &&
        value.name.trim().length <= 60 &&
        isPriority(value.priority)
    );
}

export function isProjectList(
    value: unknown
): value is Project[] {

    return (
        Array.isArray(value) &&
        value.every(isProject)
    );
}
