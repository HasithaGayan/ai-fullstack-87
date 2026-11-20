
import { describe, expect, it } from "vitest";
import { validateProject } from "@/lib/form-projects";

describe("Project validation boundary tests", () => {

    it("accepts exactly 3 characters", () => {
        const result = validateProject({
            name: "ABC",
            priority: "Medium",
        });

        expect(result).toEqual({
            ok: true,
            data: {
                name: "ABC",
                priority: "Medium",
            },
        });
    });

    it("accepts exactly 60 characters", () => {
        const name = "A".repeat(60);

        expect(validateProject({
            name,
            priority: "High",
        })).toEqual({
            ok: true,
            data: {
                name,
                priority: "High",
            },
        });
    });

    it("rejects 2 characters", () => {
        expect(validateProject({
            name: "AB",
            priority: "Low",
        })).toEqual({
            ok: false,
            errors: {
                name: "Project name must contain 3–60 characters.",
            },
        });
    });

    it("rejects 61 characters", () => {
        expect(validateProject({
            name: "A".repeat(61),
            priority: "Medium",
        })).toEqual({
            ok: false,
            errors: {
                name: "Project name must contain 3–60 characters.",
            },
        });
    });

    it("rejects whitespace-only names", () => {
        const result = validateProject({
            name: "   ",
            priority: "Low",
        });

        expect(result.ok).toBe(false);
    });

    it("trims surrounding whitespace", () => {
        expect(validateProject({
            name: "  NextLab  ",
            priority: "Medium",
        })).toEqual({
            ok: true,
            data: {
                name: "NextLab",
                priority: "Medium",
            },
        });
    });

    it.each(["Low", "Medium", "High"] as const)(
        "accepts the %s priority",
        (priority) => {
            expect(validateProject({
                name: "NextLab",
                priority,
            })).toEqual({
                ok: true,
                data: {
                    name: "NextLab",
                    priority,
                },
            });
        }
    );

    it("rejects an unexpected priority", () => {
        expect(validateProject({
            name: "NextLab",
            priority: "Urgent",
        })).toEqual({
            ok: false,
            errors: {
                priority: "Select a valid priority.",
            },
        });
    });

    it("rejects non-object inputs", () => {
        const inputs: unknown[] = [
            null,
            "NextLab",
            123,
            [],
        ];

        for (const input of inputs) {
            expect(validateProject(input).ok).toBe(false);
        }
    });
});
