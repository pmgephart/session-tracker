/**
 * Session Tracker App
 * 
 * @author Patrick Gephart
 * @email pmgephart@gmail.com
 * @url https://abovethecrux.com
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";

import { UserSessionData, userSessionOptions } from "@/model/UserSession";

export const config = {
    matcher: [
        '/((?!api|login|_next/static|_next/image|favicon.ico).*)',
    ]
}

export async function middleware(request: NextRequest) {
    const nextCookies = await cookies();
    const session = await getIronSession<UserSessionData>(
        nextCookies,
        userSessionOptions
    );

    if(!session.loggedIn) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}
