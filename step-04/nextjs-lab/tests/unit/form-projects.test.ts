
import {
    describe,
    expect,
    it,
} from "vitest";

import {
    validateProject,
    isProjectList,
} from "@/lib/form-projects";

describe("Project validation", () => {

    it("accepts and normalizes valid data", () => {

        const result = validateProject({
            name: "  AI Platform  ",
            priority: "High",
        });

        expect(result).toEqual({
            ok: true,
            data: {
                name: "AI Platform",
                priority: "High",
            },
        });
    });

    it.each([
        [
            "short name",
            { name: "A", priority: "High" },
        ],
        [
            "long name",
            { name: "A".repeat(61), priority: "High" },
        ],
        [
            "blank name",
            { name: "   ", priority: "High" },
        ],
        [
            "numeric name",
            { name: 12345, priority: "High" },
        ],
        [
            "invalid priority",
            { name: "AI Platform", priority: "Super" },
        ],
        [
            "null input",
            null,
        ],
    ])("rejects %s", (_name, input) => {

        const result = validateProject(input);

        expect(result.ok).toBe(false);
    });

    it("validates project response lists", () => {

        expect(isProjectList([
            {
                id: 1,
                name: "AI Platform",
                priority: "High",
            },
        ])).toBe(true);

        expect(isProjectList([
            {
                id: -1,
                name: "AI Platform",
                priority: "High",
            },
        ])).toBe(false);

        expect(isProjectList(null)).toBe(false);
    });
});
