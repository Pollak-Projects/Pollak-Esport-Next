import React from "react";
import { useAuth } from "@/hooks/useAuth";

type PermissionCheckProps = {
  children: React.ReactNode;
};

export const AdminCheck = ({ children }: PermissionCheckProps) => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) return null;
  if (!isAdmin) return null;

  return <>{children}</>;
};

export const UserCheck = ({ children }: PermissionCheckProps) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return null;

  return <>{children}</>;
};
