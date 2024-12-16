import { type DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import { NextRequest } from "next/server";

declare module "next-auth" {
    interface RegisterUser extends User {
        username?: string | null;
        email?: string | null;
        enabled?: boolean | null;
        firstName?: string | null;
        lastName?: string | null;
        credentials?: {
            type?: string | null;
            value?: string | null;
        } | null;
    }

    interface User {
        id?: string;
        name?: string | null;
        email?: string | null;
        image?: string | null;
        roles?: string[] | null;
        token?: JWT | null;
    }

    interface Session extends DefaultSession {
        session: {
            user: User;
        };
        // Do not question, it works
        token?: JWT;
        error?: "RefreshTokenError";
    }

    interface NextAuthRequest extends NextRequest {
        auth: Session | null;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id_token?: string;
        access_token?: string;
        expires_at?: number;
        refresh_token?: string;
        error?: "RefreshTokenError";
    }
}