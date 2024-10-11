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
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton"

export function AddGame() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Card className="w-[350px]">
          <CardHeader>
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-3/4 mt-2" />
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="grid w-full gap-1.5">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-4 w-1/2 mt-2" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Játék hozzáadása</CardTitle>
          <CardDescription>Játékot itt tudsz hozzáadni.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Játék neve</Label>
                <Input id="name" placeholder="Játék név" />
              </div>
              <div className="grid w-full gap-1.5">
                <Label htmlFor="description">Leírás</Label>
                <Textarea placeholder="Leírás" id="description" />
                <p className="text-sm text-muted-foreground">
                  Ez a leírás fog megjelenni a játék oldalán.
                </p>
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="picture">Kép</Label>
                <Input id="picture" type="file" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Mégse</Button>
          <Button
            type="submit"
            onClick={() =>
              toast("Játék sikeresen hozzáadva", {
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
            Hozzáadás
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default AddGame;
