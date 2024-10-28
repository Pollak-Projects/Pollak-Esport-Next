"use client";

import { AxiosInstance } from "axios";
import React, { createContext, useContext } from "react";
import { useSession } from "next-auth/react";

export const AxiosContext = createContext<AxiosInstance | undefined>(
    undefined
);

export type AxiosExchangeProps = {
    session: string;
};

export const useAxios = (): AxiosInstance => {

    const instance = useContext(AxiosContext);

    if (instance) {
        return instance;
    }

    if (!instance) {
        throw new Error("No AxiosInstance set, use AxiosProvider to set one");
    }

    return instance;
};

export type AxiosProviderProps = {
    instance: AxiosInstance;
    children?: React.ReactNode;
};

export const AxiosProvider = ({
                                  instance,
                                  children,
                              }: AxiosProviderProps): React.JSX.Element => {
    // TODO this is a bad way to get the current user's session,
    //  the useAxios should require a session to be passed in form the server-side
    const session = useSession();
    // This needs to be a local variable because the useSession hook cannot be accessed from inside the useEffect hook
    const localSession = session;
    React.useEffect(() => {
        if (
            localSession.status === "loading" ||
            localSession.status === "unauthenticated"
        )
            return;

        const requestInterceptor = instance.interceptors.request.use(
            (config) => {
                config.headers.Authorization = `Bearer ${localSession.data?.token?.access_token}`;
                return config;
            },
            (error) => {
                console.log("Request error", error);
                return Promise.reject(error);
            }
        );

        const responseInterceptor = instance.interceptors.response.use(
            (config) => {
                return config;
            },
            (error) => {
                console.log("Response error", error);
                return Promise.reject(error);
            }
        );

        return () => {
            instance.interceptors.request.eject(requestInterceptor);
            instance.interceptors.response.eject(responseInterceptor);
        };
    }, [instance]);
    return (
        <AxiosContext.Provider value={instance}>{children}</AxiosContext.Provider>
    );
};
