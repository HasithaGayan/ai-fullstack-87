
import {
    test,
    expect,
} from "@playwright/test";

test("navigates between application pages", async ({ page }) => {

    await page.goto("/");

    const nav = page.getByRole(
        "navigation",
        { name: "Main navigation" }
    );

    await nav.getByRole(
        "link",
        { name: "Products", exact: true }
    ).click();

    await expect(page).toHaveURL(/\/products$/);

    await nav.getByRole(
        "link",
        { name: "Dashboard", exact: true }
    ).click();

    await expect(page).toHaveURL(/\/dashboard$/);

    await nav.getByRole(
        "link",
        { name: "Home", exact: true }
    ).click();

    await expect(page).toHaveURL("/");
});


test("rejects invalid input and focuses the field", async ({ page }) => {

    await page.goto("/form-lab");

    const name = page.getByLabel("Project name");

    await expect(name).toBeEnabled();

    await name.fill("A");

    await page.getByRole(
        "button",
        { name: "Create Project" }
    ).click();

    await expect(
        page.getByText(
            "Project name must contain 3–60 characters."
        )
    ).toBeVisible();

    await expect(name).toBeFocused();

    await expect(name).toHaveAttribute(
        "aria-invalid",
        "true"
    );
});


test("creates and edits a real project", async ({ page }) => {

    await page.goto("/form-lab");

    const name = page.getByLabel("Project name");

    const priority = page.getByLabel("Priority");

    const key = page.getByLabel(
        "Local demo write key"
    );

    await expect(name).toBeEnabled();

    await name.fill("Day 38 E2E Project");

    await priority.selectOption("High");

    await key.fill("incorrect-key");

    await page.getByRole(
        "button",
        { name: "Create Project" }
    ).click();

    await expect(
        page.getByText("Check your demo write key.")
    ).toBeVisible();

    await key.fill("nextlab-demo-key");

    await page.getByRole(
        "button",
        { name: "Create Project" }
    ).click();

    await expect(
        page.getByText("Project created successfully.")
    ).toBeVisible();

    await expect(
        page.getByRole("heading", {
            name: "Day 38 E2E Project",
            exact: true,
        })
    ).toBeVisible();

    await page.getByRole(
        "button",
        { name: "Edit Day 38 E2E Project" }
    ).click();

    await name.fill("Updated Day 38 Project");

    await priority.selectOption("Low");

    await key.fill("nextlab-demo-key");

    await page.getByRole(
        "button",
        { name: "Save Changes" }
    ).click();

    await expect(
        page.getByText("Project updated successfully.")
    ).toBeVisible();

    await expect(
        page.getByRole("heading", {
            name: "Updated Day 38 Project",
            exact: true,
        })
    ).toBeVisible();

    await expect(
        page.getByRole("heading", {
            name: "Day 38 E2E Project",
            exact: true,
        })
    ).toHaveCount(0);
});


test("shows loading and recovers from API failure", async ({ page }) => {

    let release!: () => void;

    const hold = new Promise<void>(resolve => {
        release = resolve;
    });

    await page.route(
        "**/api/form-lab",

        async route => {

            await hold;

            await route.fulfill({
                status: 503,
                json: {
                    ok: false,
                    error: {
                        message: "Service unavailable.",
                    },
                },
            });
        }
    );

    try {
        await page.goto("/form-lab");

        await expect(
            page.getByText("Loading projects...")
        ).toBeVisible();

    } finally {
        release();
    }

    await expect(
        page.getByText(
            "Unable to load projects. Try again."
        )
    ).toBeVisible();

    await page.unroute("**/api/form-lab");

    await page.getByRole(
        "button",
        { name: "Try Again" }
    ).click();

    await expect(
        page.getByLabel("Project name")
    ).toBeEnabled();

    await expect(
        page.getByRole("heading", {
            name: "Projects",
            exact: true,
        })
    ).toBeVisible();
});


test("protects pending submissions and handles failure", async ({ page }) => {

    await page.goto("/form-lab");

    const name = page.getByLabel("Project name");

    await expect(name).toBeEnabled();

    await name.fill("Pending Test Project");

    await page.getByLabel(
        "Local demo write key"
    ).fill("nextlab-demo-key");

    let release!: () => void;

    const hold = new Promise<void>(resolve => {
        release = resolve;
    });

    await page.route(
        "**/api/form-lab",

        async route => {

            if (route.request().method() !== "POST") {
                await route.continue();
                return;
            }

            await hold;

            await route.fulfill({
                status: 503,
                json: {
                    ok: false,
                    error: {
                        message: "Temporary save failure.",
                        fieldErrors: {},
                    },
                },
            });
        }
    );

    try {
        await page.getByRole(
            "button",
            { name: "Create Project" }
        ).click();

        await expect(
            page.getByRole(
                "button",
                { name: "Saving..." }
            )
        ).toBeDisabled();

        await expect(name).toBeDisabled();

    } finally {
        release();
    }

    await expect(
        page.getByText("Temporary save failure.")
    ).toBeVisible();

    await expect(name).toBeEnabled();

    await expect(name).toHaveValue(
        "Pending Test Project"
    );

    await expect(
        page.getByRole("button", {
            name: "Create Project",
        })
    ).toBeEnabled();
});


test("rejects invalid direct API mutations", async ({ request }) => {

    const before = await request.get(
        "/api/form-lab"
    );

    expect(before.status()).toBe(200);

    const response = await request.post(
        "/api/form-lab",

        {
            headers: {
                Authorization:
                    "Bearer nextlab-demo-key",
            },

            data: {
                name: "",
                priority: "Invalid",
            },
        }
    );

    expect(response.status()).toBe(400);

    const body = await response.json();

    expect(body.ok).toBe(false);

    expect(body.error.fieldErrors.name)
        .toBeDefined();

    expect(body.error.fieldErrors.priority)
        .toBeDefined();

    const after = await request.get(
        "/api/form-lab"
    );

    expect(after.status()).toBe(200);

    expect(await after.json()).toEqual(
        await before.json()
    );
});


test("supports mobile layout and keyboard navigation", async ({ page }) => {

    await page.setViewportSize({
        width: 390,
        height: 844,
    });

    await page.goto("/form-lab");

    const name = page.getByLabel("Project name");

    await expect(name).toBeEnabled();

    await name.focus();

    await page.keyboard.press("Tab");

    await expect(
        page.getByLabel("Priority")
    ).toBeFocused();

    await page.keyboard.press("Tab");

    await expect(
        page.getByLabel("Local demo write key")
    ).toBeFocused();

    const fitsViewport = await page.evaluate(() => {

        return (
            document.documentElement.scrollWidth
            <= window.innerWidth
        );
    });

    expect(fitsViewport).toBe(true);
});
