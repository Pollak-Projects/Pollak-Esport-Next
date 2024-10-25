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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Login = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // Simulate loading time
    return () => clearTimeout(timer);
  }, []);

  const handleLoginClick = () => {
    setLoading(true);
    setTimeout(() => {
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
    }, 1000); // Simulate login process
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="login">Bejelentkezés</TabsTrigger>
          <TabsTrigger value="register">Regisztráció</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card className="w-[350px]">
            <CardHeader>
              <>
                <CardTitle>Bejelentkezés</CardTitle>
                <CardDescription>A fiókodba itt tudsz belépni.</CardDescription>
              </>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="username">Felhasználónév</Label>
                    <Input
                      required
                      id="username"
                      type="text"
                      placeholder="kisjanos88"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password">Jelszó</Label>
                    <Input
                      required
                      id="password"
                      type="password"
                      placeholder="************"
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <>
                <Button variant="outline">
                  <Link href="/register">Regisztráció</Link>
                </Button>
                <Button type="button" onClick={handleLoginClick}>
                  Bejelentkezés
                </Button>
              </>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
