
import "server-only";

import {
    createHmac,
    timingSafeEqual,
} from "node:crypto";

import { cookies } from "next/headers";

export type Role = "student" | "admin";

export interface Session {
    email: string;
    role: Role;
    expiresAt: number;
}

const COOKIE_NAME = "nextlab_session";

function getSecret(): string {
    const secret =
        process.env.NEXTLAB_SESSION_SECRET;

    if (!secret || secret.length < 32) {
        throw new Error(
            "A session secret of at least 32 characters is required."
        );
    }

    return secret;
}

function getSessionLifetime(): number {
    const seconds = Number(
        process.env.NEXTLAB_SESSION_SECONDS ?? "120"
    );

    if (
        !Number.isSafeInteger(seconds) ||
        seconds < 10 ||
        seconds > 3600
    ) {
        return 120;
    }

    return seconds;
}

function sign(payload: string): string {
    return createHmac("sha256", getSecret())
        .update(payload)
        .digest("base64url");
}

function cookieOptions() {
    return {
        httpOnly: true,
        secure:
            process.env.NEXTLAB_AUTH_SECURE_COOKIE
                !== "false",
        sameSite: "lax" as const,
        path: "/",
    };
}

export async function createSession(
    email: string,
    role: Role
): Promise<void> {

    const lifetime = getSessionLifetime();

    const session: Session = {
        email,
        role,
        expiresAt:
            Date.now() + lifetime * 1000,
    };

    const payload = Buffer.from(
        JSON.stringify(session)
    ).toString("base64url");

    const signature = sign(payload);

    const token = `${payload}.${signature}`;

    const cookieStore = await cookies();

    cookieStore.set(
        COOKIE_NAME,
        token,
        {
            ...cookieOptions(),
            maxAge: lifetime,
        }
    );
}

export async function getSession():
    Promise<Session | null> {

    const cookieStore = await cookies();

    const token =
        cookieStore.get(COOKIE_NAME)?.value;

    if (!token || token.length > 4096) {
        return null;
    }

    try {
        const parts = token.split(".");

        if (parts.length !== 2) {
            return null;
        }

        const [payload, signature] = parts;

        const expected = Buffer.from(
            sign(payload)
        );

        const received = Buffer.from(
            signature
        );

        if (
            expected.length !== received.length ||
            !timingSafeEqual(
                expected,
                received
            )
        ) {
            return null;
        }

        const data: unknown = JSON.parse(
            Buffer.from(
                payload,
                "base64url"
            ).toString("utf8")
        );

        if (
            typeof data !== "object" ||
            data === null ||
            Array.isArray(data)
        ) {
            return null;
        }

        const session =
            data as Record<string, unknown>;

        if (
            typeof session.email !== "string" ||
            (
                session.role !== "student" &&
                session.role !== "admin"
            ) ||
            typeof session.expiresAt !== "number" ||
            !Number.isSafeInteger(
                session.expiresAt
            ) ||
            session.expiresAt <= Date.now()
        ) {
            return null;
        }

        return {
            email: session.email,
            role: session.role,
            expiresAt: session.expiresAt,
        };

    } catch {
        return null;
    }
}

export async function destroySession():
    Promise<void> {

    const cookieStore = await cookies();

    cookieStore.set(
        COOKIE_NAME,
        "",
        {
            ...cookieOptions(),
            maxAge: 0,
        }
    );
}
