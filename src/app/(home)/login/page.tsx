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


export default function Login() {
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
              <CardTitle>Bejelentkezés</CardTitle>
              <CardDescription>A fiókodba itt tudsz belépni.</CardDescription>
            </>
          )}
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="grid w-full items-center gap-4">
              <Skeleton className="h-10 w-full mb-4" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : (
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
              {loading ? (
                  <>
                    <Skeleton className="h-10 w-[calc(40%-0.5rem)]" />
                    <Skeleton className="h-10 w-[calc(30%-0.5rem)]" />
                  </>
              ) : (
                  <>
                    <Button variant="outline">
                      <Link href="/register">Regisztráció</Link>
                    </Button>
                    <Button type="submit">
                      Belépés
                    </Button>
                  </>
              )}
            </form>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">

        </CardFooter>
      </Card>
    </div>
  );
}

