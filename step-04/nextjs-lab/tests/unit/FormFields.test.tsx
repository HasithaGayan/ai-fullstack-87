
import {
    describe,
    expect,
    it,
    vi,
} from "vitest";

import {
    render,
    screen,
} from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import {
    TextField,
    SelectField,
    FormButton,
} from "@/components/FormFields";

describe("Accessible form components", () => {

    it("preserves input help text and error feedback", () => {

        render(
            <>
                <p id="name-help">
                    Enter a descriptive name.
                </p>

                <TextField
                    id="name"
                    label="Project name"
                    aria-describedby="name-help"
                    error="Name is required."
                />
            </>
        );

        const input = screen.getByRole(
            "textbox",
            { name: "Project name" }
        );

        expect(input).toHaveAttribute(
            "aria-invalid",
            "true"
        );

        expect(input).toHaveAccessibleDescription(
            "Enter a descriptive name. Name is required."
        );
    });

    it("preserves select help text and error feedback", () => {

        render(
            <>
                <p id="priority-help">
                    Choose a priority.
                </p>

                <SelectField
                    id="priority"
                    label="Priority"
                    options={["Low", "Medium", "High"]}
                    aria-describedby="priority-help"
                    error="Invalid priority."
                />
            </>
        );

        const select = screen.getByRole(
            "combobox",
            { name: "Priority" }
        );

        expect(select).toHaveAccessibleDescription(
            "Choose a priority. Invalid priority."
        );

        expect(select).toHaveAttribute(
            "aria-invalid",
            "true"
        );
    });

    it("blocks clicks while submitting", async () => {

        const user = userEvent.setup();

        const onClick = vi.fn();

        const { rerender } = render(
            <FormButton
                pending
                onClick={onClick}
            >
                Save
            </FormButton>
        );

        const pendingButton = screen.getByRole(
            "button",
            { name: "Saving..." }
        );

        expect(pendingButton).toBeDisabled();

        await user.click(pendingButton);

        expect(onClick).not.toHaveBeenCalled();

        rerender(
            <FormButton onClick={onClick}>
                Save
            </FormButton>
        );

        const saveButton = screen.getByRole(
            "button",
            { name: "Save" }
        );

        expect(saveButton).toBeEnabled();

        await user.click(saveButton);

        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
