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
import { Textarea } from "@/components/ui/textarea";

export function AddGame() {
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
