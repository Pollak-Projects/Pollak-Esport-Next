"use client";
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
import Image from "next/image";
import logo from "@/tempimg/logo2.png";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import { User } from "next-auth";

interface ExtendedUser extends User {
  firstName?: string;
  username?: string;
  lastName?: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

const Settings = () => {
  const { user } = useAuth() as { user: ExtendedUser | null };
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      let firstName = user.firstName;
      let lastName = user.lastName;

      // If firstName and lastName are not set, set them from the name
      if (!firstName && !lastName && user.name) {
        const nameParts = user.name.split(" ");
        lastName = nameParts[0] || "";
        firstName = nameParts.slice(1).join(" ") || "";
      }

      setFormData({
        firstName: firstName || "",
        lastName: lastName || "",
        username: user.username || "",
        email: user.email || "",
      });
    }
  }, [user]);

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-4/6 h-4/5 mt-10">
        <CardHeader>
          <CardTitle className="text-left text-5xl">Felhasználó</CardTitle>
        </CardHeader>
        <CardContent className="w-full">
          <div className="flex flex-col-reverse w-full">
            <div className="flex justify-end w-full my-7">
              <Button
                variant={"outline"}
                className="self-start w-48 border-red-600 !text-red-600"
              >
                Fiók törlése
              </Button>
            </div>
            <div className="flex-1 pt-4 pl-4 md:pl-10 border border-black rounded-lg bg-slate-900 overflow-y-auto">
              <div className="flex flex-col-reverse md:space-x-16 space-y-4 md:space-y-0">
                <div className="flex flex-wrap gap-5 mr-10">
                  <div className="flex flex-col space-y-4 w-full md:w-auto">
                    <Label htmlFor="lastname">Vezetéknév</Label>
                    <Input
                      id="lastname"
                      className="w-full max-w-[12rem]"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex flex-col space-y-4 w-full md:w-auto">
                    <Label htmlFor="firstname">Keresztnév</Label>
                    <Input
                      id="firstname"
                      className="w-full max-w-[12rem]"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex flex-col space-y-4 w-full md:w-auto">
                    <Label htmlFor="username">Felhasználónév</Label>
                    <Input
                      id="username"
                      className="w-full max-w-[12rem]"
                      value={formData.username}
                      onChange={(e) =>
                        setFormData({ ...formData, username: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex flex-col space-y-4 w-full md:w-auto">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      className="w-full max-w-[18rem]"
                      value={formData.email}
                      disabled
                    />
                  </div>
                </div>
                <div className="!ml-0 flex w-ful flex-col">
                  <div className="m-auto">
                    <div
                      className="rounded-full cursor-pointer overflow-hidden"
                      onClick={() => document.getElementById("avatar")?.click()}
                    >
                      {user?.image ? (
                        <Image
                          src={user.image}
                          alt="Profile"
                          width={200}
                          height={200}
                          className="hover:brightness-50 transition"
                        />
                      ) : (
                        <Image
                          src={logo}
                          alt="Profile"
                          width={200}
                          height={200}
                          className="hover:brightness-50 transition"
                        />
                      )}
                    </div>
                    <input
                      type="file"
                      id="avatar"
                      accept=".jpg, .jpeg, .png"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          // Handle the file upload here
                          console.log("Selected file:", file);
                        }
                      }}
                    />
                  </div>
                  <Label className="mb-4 block text-center">Profilkép</Label>
                </div>
              </div>
              <div className="flex justify-end py-5 px-10 space-x-4 w-full mt-8 md:mt-8">
                <Button variant="outline">Visszaállítás</Button>
                <Button>Mentés</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
