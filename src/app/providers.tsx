"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { QueryClient } from "@tanstack/query-core";
import axios from "axios";
import { auth } from "@/auth";
import { QueryClientProvider } from "@tanstack/react-query";
import { AxiosProvider } from "@/lib/AxiosProvider";

export interface ProvidersProps {
    children: React.ReactNode;
    Session?: Session;
}

export function Providers({ children, Session }: ProvidersProps) {
    const router = useRouter();

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 1000 * 5,
                refetchInterval: 1000 * 5,
            },
        },
    });

    const instance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
        headers: {
            "Content-Type": "application/json",
        },
    });

    return (
        <SessionProvider session={Session}>
            <AxiosProvider instance={instance}>
                <QueryClientProvider client={queryClient}>
                        <NextThemesProvider>{children}</NextThemesProvider>
                </QueryClientProvider>
            </AxiosProvider>
        </SessionProvider>
    );
}
