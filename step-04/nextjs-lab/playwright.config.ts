
import {
    defineConfig,
    devices,
} from "@playwright/test";

export default defineConfig({
    testDir: "./tests/e2e",

    fullyParallel: false,
    workers: 1,
    retries: 0,

    reporter: "list",

    use: {
        baseURL: "http://127.0.0.1:3100",
        trace: "retain-on-failure",
        screenshot: "only-on-failure",
    },

    projects: [
        {
            name: "Google Chrome",
            use: {
                ...devices["Desktop Chrome"],
                channel: "chrome",
            },
        },
    ],

    webServer: {
        command:
            "npm.cmd run start -- --hostname 127.0.0.1 --port 3100",

        url: "http://127.0.0.1:3100",

        reuseExistingServer: false,

        timeout: 120000,

        env: {
            NEXTLAB_DEMO_WRITE_KEY:
                "nextlab-demo-key",
        },
    },
});
