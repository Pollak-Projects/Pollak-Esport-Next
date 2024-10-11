"use client";
import React from "react";
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

export function register() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Regisztráció</CardTitle>
          <CardDescription>Fiókot itt tudsz létrehozni.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="fullname">Teljes név</Label>
                <Input
                  required
                  id="fullname"
                  type="text"
                  placeholder="Kis János"
                />
              </div>
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
                <Label htmlFor="email">Email</Label>
                <Input
                  required
                  id="email"
                  type="email"
                  placeholder="kis.janos1988@gmail.com"
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
          <Button variant="outline"><Link href="/login">Bejelentkezés</Link></Button>
          <Button
            type="submit"
            onClick={() =>
              toast("Sikeres regisztráció", {
                description: new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
                action: {
                  label: "Törlés",
                  onClick: () => console.log("Értesítés törölve!"),
                },
              })
            }
          >
            Regisztrálás
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default register;