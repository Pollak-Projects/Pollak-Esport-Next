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
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

const Register = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // Simulate loading time
    return () => clearTimeout(timer);
  }, []);

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
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          {loading ? (
            <>
              <Skeleton className="h-6 w-1/2 mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </>
          ) : (
            <>
              <CardTitle>Regisztráció</CardTitle>
              <CardDescription>Fiókot itt tudsz létrehozni.</CardDescription>
            </>
          )}
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              {["fullname", "username", "email", "password"].map((field) => (
                <div key={field} className="flex flex-col space-y-1.5">
                  {loading ? (
                    <>
                      <Skeleton className="h-4 w-1/4" />
                      <Skeleton className="h-10 w-full" />
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
                </div>
              ))}
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          {loading ? (
            <>
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
            </>
          ) : (
            <>
              <Button variant="outline">
                <Link href="/login">Bejelentkezés</Link>
              </Button>
              <Button type="submit" onClick={handleRegisterClick}>
                Regisztrálás
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

export default Register;
