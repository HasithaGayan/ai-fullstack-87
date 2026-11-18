
export {};

interface DashboardData {
    totalUsers: number;
    revenue: number;
    orders: number;
    activeUsers: number;
}

// Reusable generic API state
type ApiState<T> =
    | { status: "loading" }
    | { status: "success"; data: T }
    | { status: "error"; message: string };

// Display dashboard state
function displayDashboard(
    state: ApiState<DashboardData>
): void {
    switch (state.status) {
        case "loading":
            console.log("Loading dashboard data...");
            break;

        case "success":
            console.log("===== DASHBOARD =====");
            console.log("Total Users:", state.data.totalUsers);
            console.log("Revenue: LKR", state.data.revenue);
            console.log("Orders:", state.data.orders);
            console.log("Active Users:", state.data.activeUsers);
            break;

        case "error":
            console.log("Error:", state.message);
            break;
    }
}

// Sample dashboard data
const dashboardData: DashboardData = {
    totalUsers: 1250,
    revenue: 500000,
    orders: 350,
    activeUsers: 980
};

// Test loading
displayDashboard({
    status: "loading"
});

// Test success
displayDashboard({
    status: "success",
    data: dashboardData
});

// Test failure
displayDashboard({
    status: "error",
    message: "Failed to load dashboard!"
});
