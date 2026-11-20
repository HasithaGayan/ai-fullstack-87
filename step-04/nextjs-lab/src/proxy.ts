
import {
    NextResponse,
    type NextRequest,
} from "next/server";

export function proxy(
    request: NextRequest
) {
    if (
        request.method !== "GET" &&
        request.method !== "HEAD"
    ) {
        return NextResponse.next();
    }

    if (
        request.nextUrl.pathname ===
        "/legacy-notes"
    ) {
        const destination =
            request.nextUrl.clone();

        destination.pathname = "/notes-lab";

        return NextResponse.redirect(
            destination,
            307
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/legacy-notes"],
};
