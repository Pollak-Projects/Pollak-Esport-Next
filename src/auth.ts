import NextAuth, { Account, Profile, RegisterUser, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import logger from "@logger";
import { jwtDecode, JwtPayload } from "jwt-decode";

const log = logger("server:auth");

export const { handlers, signIn, signOut, auth } = NextAuth({
    session: { strategy: "jwt" },
    debug: true,
    providers: [
        CredentialsProvider({
            id: "signup",
            async authorize(credentials: any, req) {
                console.log(
                    "Authorizing with credentials\n",
                    JSON.parse(credentials.user)
                );
                const user: RegisterUser = JSON.parse(credentials.user) as RegisterUser;

                console.log("Creating new user\n", user.username);
                try {
                    const accessToken = await fetch(
                        process.env.AUTH_KEYCLOAK_TOKEN_URL!,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            },
                            body: new URLSearchParams({
                                grant_type: "client_credentials",
                                client_id: process.env.AUTH_KEYCLOAK_ID!,
                                client_secret: process.env.AUTH_KEYCLOAK_SECRET!,
                                scope: "openid"
                            })
                        }
                    );

                    const access = await accessToken.json();

                    log.debug(`Got access token ${JSON.stringify(access)}`);

                    if (!accessToken.ok) throw access;

                    const registeredResponse = await fetch(
                        process.env.AUTH_KEYCLOAK_REGISTRATION_URL!,
                        {
                            method: "POST",
                            headers: {
                                Authorization: `Bearer ${access.access_token}`,
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                username: user.username ?? "",
                                email: user.email ?? "",
                                enabled: user.enabled ?? true,
                                firstName: user.firstName ?? "",
                                lastName: user.lastName ?? "",
                                credentials: [
                                    {
                                        type: user.credentials?.type ?? "",
                                        value: user.credentials?.value ?? ""
                                    }
                                ]
                            })
                        }
                    );

                    log.debug(`Got registration response ${registeredResponse.status}`);

                    if (!registeredResponse.ok) {
                        const registrationResult = await registeredResponse.json();
                        console.error("Registration error:", registrationResult);
                        throw new Error(`Registration failed: ${JSON.stringify(registrationResult)}`);
                    }
                    const res = await fetch(process.env.AUTH_KEYCLOAK_TOKEN_URL!, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        body: new URLSearchParams({
                            grant_type: "password",
                            client_id: process.env.AUTH_KEYCLOAK_ID!,
                            client_secret: process.env.AUTH_KEYCLOAK_SECRET!,
                            username: user.username!,
                            password: user.credentials?.value!,
                            scope: "openid"
                        }),
                    });
                    const tokenOrError = await res.json();

                    if (!res.ok) throw tokenOrError;

                    console.log("Logging in with credentials\n", tokenOrError);

                    return tokenOrError as JWT;
                } catch (error) {
                    console.error("Error registering:", error);

                    return null;
                }
            },
        }),
        CredentialsProvider({
            id: "login",
            name: "Credentials",
            credentials: {
                username: { type: "text" },
                password: { type: "password" }
            },
            async authorize(credentials, req): Promise<User | null> {
                log.debug("Authorizing with credentials");
                try {
                    const res = await fetch(process.env.AUTH_KEYCLOAK_TOKEN_URL!, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        body: new URLSearchParams({
                            grant_type: "password",
                            client_id: process.env.AUTH_KEYCLOAK_ID!,
                            client_secret: process.env.AUTH_KEYCLOAK_SECRET!,
                            username: (credentials?.username as string) || "",
                            password: (credentials?.password as string) || "",
                            scope: "openid"
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
                        token
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
        newUser: "/register"
    },
    events: {
        async signOut() {
            // This is a SERIOUSLY hacky way to do this, but it works.
            const session: Session | null = await auth();

            const url = `${process.env.KEYCLOAK_SESSION_END_URL}?id_token_hint=${encodeURIComponent(session?.token?.id_token!)}&post_logout_redirect_uri=${encodeURIComponent(process.env.HOST_URL!)}`;

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
        async signIn({ user, account, profile }: { user: User; account: Account | null, profile?: Profile | undefined }) {
            // These aren't read only, so it's just ts being stupid
            // @ts-ignore
            account!.id_token = user.token?.id_token;
            // @ts-ignore
            account!.access_token = user.token?.access_token;
            // @ts-ignore
            account!.refresh_token = user.token?.refresh_token;
            account!.expires_at = user.token?.expires_at;

            return true;
        },
        async jwt({ token, account }): Promise<JWT> {
            // log.debug("JWT\n", token, account);
            if (account) {
                return {
                    ...token,
                    id_token: account.id_token,
                    access_token: account.access_token,
                    refresh_token: account.refresh_token,
                    expires_at: account.expires_at
                };
            } else if (Date.now() < token.expires_at! * 1000) {
                // Subsequent logins, but the `access_token` is still valid
                log.debug("Token is still valid");

                return token;
            } else {
                if (!token.refresh_token) throw new TypeError("Missing refresh token");
                log.debug("Refreshing token");
                try {
                    const res = await fetch(`${process.env.AUTH_KEYCLOAK_TOKEN_URL}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        body: new URLSearchParams({
                            client_id: process.env.AUTH_KEYCLOAK_ID!,
                            client_secret: process.env.AUTH_KEYCLOAK_SECRET!,
                            grant_type: "refresh_token",
                            refresh_token: token.refresh_token!
                        }),
                    });
                    const tokensOrError = await res.json();

                    if (!res.ok) throw tokensOrError;

                    const newToken = tokensOrError as {
                        id_token: string;
                        access_token: string;
                        expires_in: number;
                        refresh_token: string;
                    };

                    // console.log("old token\n", token);
                    // console.log("new token\n", newToken);

                    token.id_token = newToken.id_token;
                    token.access_token = newToken.access_token;
                    token.expires_at = Math.floor(
                        Date.now() / 1000 + newToken.expires_in
                    );
                    if (newToken.refresh_token) {
                        token.refresh_token = newToken.refresh_token;
                    }

                    return token;
                } catch (error) {
                    log.error("Error refreshing token:", error);
                    token.error = "RefreshTokenError";

                    return token;
                }
            }
        },
        async session({ session, token }: { session: Session; token: JWT }): Promise<Session> {
            // token is the returned value of `jwt()`
            const payload = jwtDecode<JwtPayload>(token.access_token!);

            // @ts-ignore
            const roles = payload.resource_access[process.env.AUTH_KEYCLOAK_ID!].roles;
            // @ts-ignore
            payload.realm_access.roles.forEach((role: string) => roles.push(role));

            const newSession: Session = {
                session: {
                    user: {
                        id: token.sub,
                        email: token.email,
                        name: token.name,
                        image: token.picture,
                        roles: roles
                    }
                },
                token: token,
                expires: session.expires
            };

            return newSession;
            // Can just return token if you want.
        },
        async authorized({ auth }: { auth: Session | null }) {
            return !!auth;
        }
    },
});