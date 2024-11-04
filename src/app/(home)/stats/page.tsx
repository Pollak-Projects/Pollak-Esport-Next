"use client";
import React, { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const Stats = () => {
    const [loading, setLoading] = useState(true);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        // Simulate data loading
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        // Set isClient to true when the component is mounted
        setIsClient(true);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {isClient && window.innerWidth >= 3840 ? (
                <>
                    <div className="flex flex-wrap gap-10 p-10">
                        <Card className="w-[24.25%] bg-slate-800">
                            <CardHeader>
                                <CardTitle className="text-center">
                                    Regisztrált felhasználók
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {loading ? (
                                    <Skeleton className="h-16 w-full bg-slate-700" />
                                ) : (
                                    <p className="text-6xl text-center">365</p>
                                )}
                            </CardContent>
                        </Card>
                        <Card className="w-[24.25%] bg-slate-800">
                            <CardHeader>
                                <CardTitle className="text-center">
                                    Regisztrált csapatok
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {loading ? (
                                    <Skeleton className="h-16 w-full bg-slate-700" />
                                ) : (
                                    <p className="text-6xl text-center">23</p>
                                )}
                            </CardContent>
                        </Card>
                        <Card className="w-[24.25%] bg-slate-800">
                            <CardHeader>
                                <CardTitle className="text-center">
                                    Lejátszott meccsek
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {loading ? (
                                    <Skeleton className="h-16 w-full bg-slate-700" />
                                ) : (
                                    <p className="text-6xl text-center">28</p>
                                )}
                            </CardContent>
                        </Card>
                        <Card className="w-[24.25%] bg-slate-800">
                            <CardHeader>
                                <CardTitle className="text-center">
                                    Live nézők
                                    <span className="relative inline-flex ml-2">
                                        <span className="absolute inline-flex h-3 w-3 rounded-full bg-red-500 opacity-75 animate-ping"></span>
                                        <span className="relative inline-flex h-3 w-3 rounded-full bg-red-600"></span>
                                    </span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {loading ? (
                                    <Skeleton className="h-16 w-full bg-slate-700" />
                                ) : (
                                    <p className="text-6xl text-center">1 207</p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                    <div className="flex flex-wrap">
                        <div className="flex flex-col gap-10 p-10">
                            <Card className="w-80 max-h-40 bg-slate-800">
                                <CardHeader>
                                    <CardTitle className="text-center">
                                        Összes nézettség
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {loading ? (
                                        <Skeleton className="h-16 w-full bg-slate-700" />
                                    ) : (
                                        <p className="text-6xl text-center">105 263</p>
                                    )}
                                </CardContent>
                            </Card>
                            <Card className="w-80 max-h-40 bg-slate-800">
                                <CardHeader>
                                    <CardTitle className="text-center">
                                        Összes nézettség eszközönként
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {loading ? (
                                        <Skeleton className="h-16 w-full bg-slate-700" />
                                    ) : (
                                        <div className="flex justify-center gap-5">
                                            <p className="text-3xl text-center">72 805</p>
                                            <Separator orientation="vertical" />
                                            <p className="text-3xl text-center">32 458</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                            <Card className="w-80 max-h-40 bg-slate-800">
                                <CardHeader>
                                    <CardTitle className="text-center">
                                        Átlag nézettség eszközönként havonta
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {loading ? (
                                        <Skeleton className="h-16 w-full bg-slate-700" />
                                    ) : (
                                        <div className="flex justify-center gap-5">
                                            <p className="text-3xl text-center">6 067</p>
                                            <Separator orientation="vertical" />
                                            <p className="text-3xl text-center">2 074</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                        <div className="w-[89dvw] h-[79dvh]">
                            <iframe
                                src="https://player.twitch.tv/?channel=piratesoftware&parent=localhost"
                                height="100%"
                                width="100%"
                                allowFullScreen={true}
                            ></iframe>
                        </div>
                    </div>
                </>
            ) : (
                <div className="flex items-center justify-center h-screen">
                    <p className="text-6xl">Az oldalt csak 4K-s kijelzőn lehet használni!</p>
                </div>
            )}
        </>
    );
};

export default Stats;
