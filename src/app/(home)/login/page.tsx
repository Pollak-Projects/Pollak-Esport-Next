"use client";
import React, { useState, useEffect, FormEvent } from "react";
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
// import { cookies } from "next/headers";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmitLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    try {
      const result = await signIn("login", {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid username or password");
        toast.error("Login failed");
        return;
      }

      toast.success("Successfully logged in");
      window.location.href = "/";
    } catch (error) {
      setError("An unexpected error occurred");
      toast.error("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitSignup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const [lastName, firstName] = (formData.get("fullName") as string).split(
      " "
    );

    try {
      const response = await signIn("signup", {
        user: JSON.stringify({
          username: formData.get("username"),
          email: formData.get("email"),
          firstName: firstName || "",
          lastName: lastName || "",
          credentials: {
            type: "password",
            value: formData.get("password"),
          },
        }),
        redirect: false,
      });

      if (response?.error) {
        toast.error("Registration failed");
        setError(response.error);
        return;
      }

      toast.success("Registration successful");
      window.location.href = response?.url || "/";
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("An unexpected error occurred");
      setError("Registration failed");
    } finally {
      setIsLoading(false);
    }
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
          {isLoading ? (
            <Skeleton className="w-[350px] h-[400px]" />
          ) : (
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle>Bejelentkezés</CardTitle>
                <CardDescription>A fiókodba itt tudsz belépni.</CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  action="/api/auth/callback/login"
                  onSubmit={onSubmitLogin}
                  method={"post"}
                  className="space-y-4"
                >
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="username">Felhasználónév</Label>
                      <Input
                        required
                        id="username"
                        name="username"
                        type="text"
                        placeholder="gemesgergo"
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
                    <div className="flex justify-center pt-2">
                      <Button type="submit">Bejelentkezés</Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        <TabsContent value="register">
          {isLoading ? (
            <Skeleton className="w-[350px] h-[400px]" />
          ) : (
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle>Regisztráció</CardTitle>
                <CardDescription>Fiókot itt tudsz létrehozni.</CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  action="/api/auth/callback/signup"
                  onSubmit={onSubmitSignup}
                  method={"post"}
                  className="space-y-4"
                >
                  <div className="grid w-full items-center gap-4">
                    {["fullName", "username", "email", "password"].map(
                      (field) => (
                        <div key={field} className="flex flex-col space-y-1.5">
                          <Label htmlFor={field}>
                            {field === "fullName"
                              ? "Teljes név"
                              : field === "username"
                              ? "Felhasználónév"
                              : field === "email"
                              ? "Email"
                              : "Jelszó"}
                          </Label>
                          <Input
                            required
                            name={field}
                            id={field}
                            type={
                              field === "email"
                                ? "email"
                                : field === "password"
                                ? "password"
                                : "text"
                            }
                            placeholder={
                              field === "fullName"
                                ? "Gémes Gergő"
                                : field === "username"
                                ? "gemesgergo"
                                : field === "email"
                                ? "gemes.gergo@gmail.com"
                                : "************"
                            }
                          />
                        </div>
                      )
                    )}
                  </div>
                  <div className="flex justify-center pt-2">
                    <Button type="submit">Regisztrálás</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
