import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";

const protectedRoute = ['/dashboard'];

export async function middleware(request: NextRequest) {
    const session = await auth();

    const { pathname } = request.nextUrl;

    const isProtected = protectedRoute.some((route) => pathname.startsWith(route));

    if (isProtected && !session) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
};