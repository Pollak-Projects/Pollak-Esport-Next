import NextAuth, {
  Account,
  Profile,
  RegisterUser,
  Session,
  User,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import logger from "@logger";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { createKeycloakUser } from "@/lib/keycloak";

interface KeycloakPayload extends JwtPayload {
  resource_access?: {
    [key: string]: { roles: string[] };
  };
  realm_access?: {
    roles: string[];
  };
  email?: string;
  name?: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
  preferred_username?: string;
}

interface RegistrationCredentials {
  user: string;
}

const log = logger("server:auth");

const authOptions = {
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" as const },
  debug: true,
  providers: [
    CredentialsProvider({
      id: "signup",
      name: "Signup",
      credentials: {
        user: { type: "text", label: "User Data" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.user) {
            throw new Error("No user data provided");
          }

          const userData = JSON.parse(credentials.user as string);

          // Create user using admin token
          await createKeycloakUser(userData);

          // Log in the new user
          const loginRes = await fetch(process.env.AUTH_KEYCLOAK_TOKEN_URL!, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              grant_type: "password",
              client_id: process.env.AUTH_KEYCLOAK_ID!,
              client_secret: process.env.AUTH_KEYCLOAK_SECRET!,
              username: userData.username,
              password: userData.credentials.value,
              scope: "openid profile email",
            }),
          });

          if (!loginRes.ok) {
            const error = await loginRes.text();
            throw new Error(`Login failed: ${error}`);
          }

          const tokens = await loginRes.json();
          const payload = jwtDecode<KeycloakPayload>(tokens.access_token);

          return {
            id: payload.sub,
            name: payload.preferred_username || userData.username,
            email: userData.email,
            token: tokens,
          };
        } catch (error) {
          log.error("Registration error:", error);
          throw error;
        }
      },
    }),
    CredentialsProvider({
      id: "login",
      name: "Credentials",
      credentials: {
        username: { type: "text" },
        password: { type: "password" },
      },
      async authorize(credentials, req): Promise<User | null> {
        log.debug("Authorizing with credentials");
        try {
          const res = await fetch(process.env.AUTH_KEYCLOAK_TOKEN_URL!, {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              grant_type: "password",
              client_id: process.env.AUTH_KEYCLOAK_ID!,
              client_secret: process.env.AUTH_KEYCLOAK_SECRET!,
              username: (credentials?.username as string) || "",
              password: (credentials?.password as string) || "",
              scope: "openid",
            }),
          });
          log.debug(`Got response ${res.status}`);
          const tokenOrError = await res.json();

          log.debug(JSON.stringify(tokenOrError));

          if (!res.ok) throw tokenOrError;

          log.debug("Logging in with credentials");

          const token = tokenOrError as JWT;

          const newUser: User = {
            id: token.sub,
            email: token.email,
            name: token.name,
            image: token.picture,
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
    newUser: "/register",
  },
  events: {
    async signOut() {
      // This is a SERIOUSLY hacky way to do this, but it works.
      const session: Session | null = await auth();

      const url = `${
        process.env.KEYCLOAK_SESSION_END_URL
      }?id_token_hint=${encodeURIComponent(
        session?.token?.id_token || ""
      )}&post_logout_redirect_uri=${encodeURIComponent(process.env.HOST_URL!)}`;

      try {
        const resp = await fetch(url, { method: "GET" });
        log.debug("Logged out\n", resp);
        log.debug(await resp.text());
      } catch (error) {
        log.error("Failed to logout:", error);
      }
    },
  },
  callbacks: {
    async signIn({ user, account }: { user: User; account: Account | null }) {
      if (!user?.token) return false;

      const mutableAccount = account || ({} as any);
      Object.assign(mutableAccount, {
        id_token: user.token.id_token,
        access_token: user.token.access_token,
        refresh_token: user.token.refresh_token,
        expires_at: user.token.expires_at,
      });

      return true;
    },
    async jwt({ token, account }: { token: JWT; account: Account | null }) {
      if (account) {
        return {
          ...token,
          id_token: account.id_token,
          access_token: account.access_token,
          refresh_token: account.refresh_token,
          expires_at: account.expires_at,
        };
      }

      if (!token.access_token || !token.refresh_token) return token;

      // Token is still valid
      if (Date.now() < (token.expires_at || 0) * 1000) {
        return token;
      }

      // Token expired, try to refresh
      try {
        const res = await fetch(process.env.AUTH_KEYCLOAK_TOKEN_URL!, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            client_id: process.env.AUTH_KEYCLOAK_ID!,
            client_secret: process.env.AUTH_KEYCLOAK_SECRET!,
            grant_type: "refresh_token",
            refresh_token: token.refresh_token,
          }),
        });

        const newToken = await res.json();

        if (!res.ok) throw newToken;

        return {
          ...token,
          access_token: newToken.access_token,
          refresh_token: newToken.refresh_token ?? token.refresh_token,
          expires_at: Math.floor(Date.now() / 1000 + newToken.expires_in),
        };
      } catch (error) {
        console.error("Error refreshing token:", error);
        return { ...token, error: "RefreshTokenError" };
      }
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (!token.access_token) return session;

      try {
        const payload = jwtDecode<KeycloakPayload>(token.access_token);

        return {
          ...session,
          user: {
            id: payload.sub,
            email: payload.email,
            name: payload.preferred_username || payload.name, // Use username instead of name
            firstName: payload.given_name,
            lastName: payload.family_name,
            image: payload.picture,
            roles: [
              ...(payload.resource_access?.[process.env.AUTH_KEYCLOAK_ID!]
                ?.roles || []),
              ...(payload.realm_access?.roles || []),
            ],
          },
          token,
          error: undefined,
        };
      } catch (error) {
        console.error("Error decoding token:", error);
        return { ...session, error: "RefreshAccessTokenError" };
      }
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
