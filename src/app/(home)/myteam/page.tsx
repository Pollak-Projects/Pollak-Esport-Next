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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const MyTeam = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="max-w-[600px]">
        <CardHeader>
          <CardTitle>Csapatom</CardTitle>
          <CardDescription>A csapatod itt tudod szerkeszteni.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Csapat neve (14 napos várakozási idő)</Label>
                <Input id="name" placeholder="Iron 8" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Csapat tagjai</Label>
                <Table>
                  <TableCaption>Nincs több tag</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Felhasználónév</TableHead>
                      <TableHead>Teljes név</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead className="text-right">Kezelés</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">kisjanos88</TableCell>
                      <TableCell>Kis János</TableCell>
                      <TableCell>kis.janos1988@gmail.com</TableCell>
                      <TableCell className="text-right">
                        {" "}
                        <Button variant="ghost">
                          <img
                            width="20"
                            height="20"
                            src="https://img.icons8.com/metro/FF0000/26/trash.png"
                            alt="trash"
                          />
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
                <div className="flex flex-col space-y-1.5 items-center">
                <Label>Csatlakozási kód</Label>
                <InputOTP disabled maxLength={6} value="J48K7S">
                  <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Mégse</Button>
          <Button type="submit">Mentés</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MyTeam;
