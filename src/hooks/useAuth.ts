import { useSession } from "next-auth/react";

export interface AuthUser {
  id?: string;
  email?: string | null;
  name?: string | null;
  image?: string | null;
  username?: string;
  firstName?: string;
  lastName?: string;
  roles?: string[];
}

export function useAuth() {
  const { data: session, status } = useSession();

  return {
    user: session?.user as AuthUser | null,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
  };
}
