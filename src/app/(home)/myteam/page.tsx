"use client";
import React, { useEffect, useState } from "react";
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
import { Trash2 } from "lucide-react";
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

interface User {
  id: number;
  username: string;
  nev: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

const MyTeam = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [teamData, setTeamData] = useState({
    name: "",
    members: [] as User[],
    joinCode: "000000",
  });

  const fetchTeamMembers = async (teamId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/usersonteam/${teamId}`
      );
      const result = await response.json();
      return result.data || [];
    } catch (error) {
      console.error("Error fetching team members:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/team/Kiralyok1`
        );
        const result = await response.json();
        const data = result.data[0];
        const teamMembers = await fetchTeamMembers(data.id);

        setTeamData({
          name: data?.nev || "",
          members: teamMembers,
          joinCode: data?.inviteCode || "000000",
        });
        console.log("Final team data state:", {
          name: data?.nev || "",
          members: teamMembers,
          joinCode: data?.inviteCode || "000000",
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="max-w-[800px]">
        <CardHeader>
          <CardTitle>Csapatom</CardTitle>
          <CardDescription>A csapatod itt tudod szerkeszteni.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">
                  Csapat neve (14 napos várakozási idő)
                </Label>
                <Input id="name" placeholder={teamData.name || "Csapat neve"} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Csapat tagjai</Label>
                <Table>
                  <TableCaption>
                    {isLoading ? "Betöltés..." : "Nincs több tag"}
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Felhasználónév</TableHead>
                      <TableHead>Teljes név</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead className="text-right">Kezelés</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {!isLoading &&
                      teamData.members.map((member: User, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {member.username}
                          </TableCell>
                          <TableCell>{member.nev}</TableCell>
                          <TableCell>{member.email}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost">
                              <Trash2 color="red" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
              <div className="flex flex-col space-y-1.5 items-center">
                <Label>Csatlakozási kód</Label>
                <InputOTP disabled maxLength={6} value={teamData.joinCode}>
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
