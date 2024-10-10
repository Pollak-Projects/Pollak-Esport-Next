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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function NewTeam() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Csapat létrehozása</CardTitle>
          <CardDescription>Hozz létre egy csapatot.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Csapat neve</Label>
                <Input id="name" placeholder="Csapat név" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="osztaly">Osztály</Label>
                <Select>
                  <SelectTrigger id="osztaly">
                    <SelectValue placeholder="Osztály" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="9.A">9.A</SelectItem>
                    <SelectItem value="9.B">9.B</SelectItem>
                    <SelectItem value="10.A">10.A</SelectItem>
                    <SelectItem value="10.B">10.B</SelectItem>
                    <SelectItem value="11.A">11.A</SelectItem>
                    <SelectItem value="11.B">11.B</SelectItem>
                    <SelectItem value="12.A">12.A</SelectItem>
                    <SelectItem value="12.B">12.B</SelectItem>
                    <SelectItem value="13.A">13.A IRÜ SZF1 SZF2</SelectItem>
                    <SelectItem value="13.B">13.B EE IPI</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Mégse</Button>
          <Button
            type="submit"
            onClick={() =>
              toast("Csapat sikeresen létrehozva", {
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
            Létrehozás
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default NewTeam;
