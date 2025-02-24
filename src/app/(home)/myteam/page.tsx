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
  name: string;
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
      console.log("Fetching team members for ID:", teamId);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/usersonteam/${teamId}`
      );
      const result = await response.json();
      console.log("Team members raw response:", result);
      // Ellenőrizzük, hogy a data tömb létezik-e
      return result.data || [];
    } catch (error) {
      console.error("Error fetching team members:", error);
      return [];
    }
  };

  const fetchUserDetails = async (userId: string): Promise<User | null> => {
    try {
      console.log("Fetching user details for ID:", userId);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${userId}`
      );
      const result = await response.json();
      console.log("User details response:", result);

      if (result.data && result.data.length > 0) {
        return result.data[0];
      }
      return null;
    } catch (error) {
      console.error("Error fetching user details:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setIsLoading(true);
        console.log("Fetching team data...");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/team/Kiralyok1`
        );
        const result = await response.json();
        console.log("Team data response:", result);

        const data = result.data[0];
        console.log("Processed team data:", data);

        const teamMembers = await fetchTeamMembers(data.id);
        console.log("All team members:", teamMembers);

        // Ellenőrizzük, hogy a teamMembers tömb-e
        if (!Array.isArray(teamMembers)) {
          console.error("Team members is not an array:", teamMembers);
          return;
        }

        const memberDetails = await Promise.all(
          teamMembers.map(async (member) => {
            console.log("Processing member:", member);
            // Ellenőrizzük, hogy a userId létezik-e
            if (!member.userId) {
              console.error("Member has no userId:", member);
              return null;
            }
            return await fetchUserDetails(member.userId);
          })
        );
        console.log("All member details:", memberDetails);

        const validMembers = memberDetails.filter((member) => member !== null);
        console.log("Valid members:", validMembers);

        setTeamData({
          name: data?.name || "",
          members: validMembers,
          joinCode: data?.inviteCode || "000000",
        });
        console.log("Final team data state:", {
          name: data?.name || "",
          members: validMembers,
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
      <Card className="max-w-[600px]">
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
                          <TableCell>{member.name}</TableCell>
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
