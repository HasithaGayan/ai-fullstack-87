
export {};

interface User {
    id: number;
    name: string;
    email: string;
    role: "admin" | "customer";
}

// Only allow name and email updates
type UserUpdate = Partial<Pick<User, "name" | "email">>;

// Public profile type
type PublicProfile = Pick<User, "id" | "name" | "role">;

// Update user information
function updateUser(
    user: User,
    changes: UserUpdate
): User {
    return {
        ...user,
        ...changes
    };
}

// Create a public profile
function getPublicProfile(user: User): PublicProfile {
    return {
        id: user.id,
        name: user.name,
        role: user.role
    };
}

// Sample user
const user: User = {
    id: 101,
    name: "Alex",
    email: "alex@example.com",
    role: "customer"
};

// Update the user's name
const updatedUser = updateUser(user, {
    name: "Alex Developer"
});

// Create public profile
const publicProfile = getPublicProfile(updatedUser);

// Display results
console.log("Day 23 - User Service");

console.log("Original Name:", user.name);

console.log("Updated Name:", updatedUser.name);

console.log("Email:", updatedUser.email);

console.log("Role:", updatedUser.role);

console.log("Public Profile:", publicProfile);
