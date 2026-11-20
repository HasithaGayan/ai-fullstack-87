
"use server";

import { redirect } from "next/navigation";

import {
    createSession,
    destroySession,
} from "@/lib/auth-session";

export async function signIn(
    formData: FormData
): Promise<void> {

    const rawEmail = formData.get("email");
    const password = formData.get("password");

    if (
        typeof rawEmail !== "string" ||
        typeof password !== "string" ||
        password.length > 128
    ) {
        redirect("/auth-lab?error=invalid");
    }

    const email =
        rawEmail.trim().toLowerCase();

    const studentPassword =
        process.env.NEXTLAB_STUDENT_PASSWORD;

    const adminPassword =
        process.env.NEXTLAB_ADMIN_PASSWORD;

    const secret =
        process.env.NEXTLAB_SESSION_SECRET;

    if (
        !studentPassword ||
        !adminPassword ||
        studentPassword === adminPassword ||
        !secret ||
        secret.length < 32
    ) {
        redirect("/auth-lab?error=config");
    }

    if (
        email === "student@example.com" &&
        password === studentPassword
    ) {
        await createSession(email, "student");

    } else if (
        email === "admin@example.com" &&
        password === adminPassword
    ) {
        await createSession(email, "admin");

    } else {
        redirect("/auth-lab?error=invalid");
    }

    redirect("/auth-lab/dashboard");
}

export async function signOut():
    Promise<void> {

    await destroySession();

    redirect("/auth-lab?message=logout");
}
