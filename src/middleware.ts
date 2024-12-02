import { NextRequest, NextResponse } from "next/server";

import { Pages } from "@/config/pathRoles";
import { auth } from "@/auth";
import { Session } from "next-auth";
import logger from "@logger";

const publicPages = ["/login", "/forbidden"];
const defaultPathnameRegex = RegExp(
  `^/((api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|${publicPages
    .flatMap((p) => p.slice(1))
    .join("|")}).*)$`,
  "i"
);

const log = logger("server:middleware");

const restrictedPathnameRegex = RegExp(
  `^/((${Pages.flatMap((p) => p.path.slice(1)).join("|")}).*)$`
);

export interface NextAuthRequest extends NextRequest {
  auth: Session | null;
}

export default auth((req: NextAuthRequest) => {
  const session = req.auth;

  if (!session && !defaultPathnameRegex.test(req.nextUrl.pathname))
    return NextResponse.redirect(new URL("/login", req.url));

  if (session && req.nextUrl.pathname.includes("/login"))
    return NextResponse.redirect(new URL("/", req.url));

  if (defaultPathnameRegex.test(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  if (
    restrictedPathnameRegex.test(req.nextUrl.pathname) &&
    (!session ||
      !Pages.some((page) => {
        const pagePathRegex = RegExp(`^/((${page.path.slice(1)}).*)$`, "i");

        return (
          pagePathRegex.test(req.nextUrl.pathname) &&
          session.session.user?.roles?.some((role) => page.roles.includes(role))
        );
      }))
  ) {
    return NextResponse.redirect(new URL("/forbidden", req.url));
  }

  return NextResponse.next();
});
