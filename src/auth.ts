import NextAuth, { Account, Profile, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import logger from "@logger";

const log = logger("server:auth");

interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user_id: string;
}

interface TokenPayload {
  sub: string;
  name: string;
  email: string;
  userGroup: string;
  om: string;
  iat: number;
  exp: number;
}

const authOptions = {
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" as const },
  debug: true,
  providers: [
    CredentialsProvider({
      id: "login",
      name: "Credentials",
      credentials: {
        username: { type: "text" },
        password: { type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        log.debug("Authorizing with credentials");
        try {
          const res = await fetch("https://auth.pollak.info/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: credentials?.username,
              password: credentials?.password,
            }),
          });

          log.debug(`Got response ${res.status}`);
          const authResponse: AuthResponse = await res.json();

          if (!res.ok) throw new Error("Login failed");

          log.debug("Logging in with credentials");

          const token = authResponse.access_token;

          const newUser: User = {
            id: authResponse.user_id,
            email: "",
            name: credentials?.username || "",
            token,
          };

          return newUser;
        } catch (error) {
          log.error("Error logging in:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        return {
          ...token,
          access_token: user.token,
          user_id: user.id,
        };
      }

      try {
        const verifyRes = await fetch("https://auth.pollak.info/auth/verify", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token.access_token}`,
          },
        });

        log.debug(`Token verification response: ${verifyRes.status}`);

        if (!verifyRes.ok) {
          throw new Error(
            `Token verification failed: ${await verifyRes.text()}`
          );
        }

        return token;
      } catch (error) {
        console.error("Error verifying token:", error);
        return { ...token, error: "TokenVerificationError" };
      }
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (!token.access_token) return session;

      try {
        const payload: TokenPayload = JSON.parse(
          Buffer.from(token.access_token.split(".")[1], "base64").toString()
        );

        return {
          ...session,
          user: {
            id: token.user_id,
            email: payload.email,
            name: payload.name,
            userGroup: payload.userGroup,
            om: payload.om,
          },
          token,
          error: undefined,
        };
      } catch (error) {
        console.error("Error decoding token:", error);
        return { ...session, error: "TokenDecodeError" };
      }
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
