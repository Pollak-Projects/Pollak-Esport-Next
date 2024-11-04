"use client";
import React, {useState, useEffect, FormEvent} from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { signIn } from "next-auth/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


const Login=() => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000); // Simulate loading time
        return () => clearTimeout(timer);
    }, []);

    // This can ONLY work from the server side
    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        setLoading(false);
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        console.log(formData.get("username"));
        console.log(formData.get("password"));

        // TODO add proper form validation
        if (formData.get("username") == "" || formData.get("password") == "") {
            toast("Hiba történt a bejelentkezés során", {
                description: "Kérlek próbáld újra!",
                action: {
                    label: "Törlés",
                    onClick: () => console.log("Értesítés törölve!"),
                },
            });
            return
        }

        await signIn("credentials", {
            username: formData.get("username"),
            password: formData.get("password"),
            redirect: false,
        });
        setLoading(false);

        toast("Sikeres bejelentkezés", {
            description: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            }),
            action: {
                label: "Törlés",
                onClick: () => console.log("Értesítés törölve!"),
            },
        });
    };
    const handleRegisterClick = () => {
        toast("Sikeres regisztráció", {
            description: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            }),
            action: {
                label: "Törlés",
                onClick: () => console.log("Értesítés törölve!"),
            },
        });
    };

    return (
        <div className="flex justify-center items-center pt-56">
            <Tabs defaultValue="login" className="w-68">
                <TabsList className="mx-auto flex justify-center gap-10">
                    <TabsTrigger value="login" className="w-36">
                        Bejelentkezés
                    </TabsTrigger>
                    <TabsTrigger value="register" className="w-36">
                        Regisztráció
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                    <Card className="w-[350px]">
                        <CardHeader>
                            <CardTitle>Bejelentkezés</CardTitle>
                            <CardDescription>A fiókodba itt tudsz belépni.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form
                                action="/api/auth/callback/credentials"
                                onSubmit={onSubmit}
                                method={"post"}
                            >
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="username">Felhasználónév</Label>
                                        <Input
                                            required
                                            id="username"
                                            name="username"
                                            type="text"
                                            placeholder="kisjanos88"
                                        />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="password">Jelszó</Label>
                                        <Input
                                            required
                                            id="password"
                                            name="password"
                                            type="password"
                                            placeholder="************"
                                        />
                                    </div>
                                </div>
                                <Button type="submit">
                                    Bejelentkezés
                                </Button>
                            </form>
                        </CardContent>
                        <CardFooter className="flex justify-center">

                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="register">
                    <Card className="w-[350px]">
                        <CardHeader>
                            <CardTitle>Regisztráció</CardTitle>
                            <CardDescription>Fiókot itt tudsz létrehozni.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form>
                                <div className="grid w-full items-center gap-4">
                                    {["fullname", "username", "email", "password"].map(
                                        (field) => (
                                            <div key={field} className="flex flex-col space-y-1.5">
                                                <Label htmlFor={field}>
                                                    {field === "fullname"
                                                        ? "Teljes név"
                                                        : field === "username"
                                                        ? "Felhasználónév"
                                                        : field === "email"
                                                        ? "Email"
                                                        : "Jelszó"}
                                                </Label>
                                                <Input
                                                    required
                                                    id={field}
                                                    type={
                                                        field === "email"
                                                        ? "email"
                                                        : field === "password"
                                                        ? "password"
                                                        : "text"
                                                    }
                                                    placeholder={
                                                        field === "fullname"
                                                            ? "Kis János"
                                                            : field === "username"
                                                            ? "kisjanos88"
                                                            : field === "email"
                                                            ? "kis.janos1988@gmail.com"
                                                            : "************"
                                                    }
                                                />
                                            </div>
                                        )
                                    )}
                                </div>
                            </form>
                        </CardContent>
                        <CardFooter className="flex justify-center">
                            <Button type="submit" onClick={handleRegisterClick}>
                                Regisztrálás
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
export default Login;