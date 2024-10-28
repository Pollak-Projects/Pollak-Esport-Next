import NextAuth, { Account, type DefaultSession, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import { AdapterSession, AdapterUser } from "@auth/core/adapters";

declare module "next-auth" {
    interface Session {
        session: {} & AdapterSession & DefaultSession;
        // Do not question it works
        token?: JWT;
        error?: "RefreshTokenError";
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
