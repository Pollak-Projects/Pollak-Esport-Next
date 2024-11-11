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
const Settings = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-5/6 h-4/5 mt-10">
        <CardHeader>
          <CardTitle className="text-center text-5xl">Beállítások</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row">
            <div className="flex flex-wrap flex-col space-y-4 w-48">
              <div className="flex flex-wrap flex-col space-y-4 w-48">
                <Button variant={"outline"} className="self-start w-48">
                  Fiók
                </Button>
                <Button variant={"outline"} className="self-start w-48">
                  Button 2
                </Button>
                <Button variant={"outline"} className="self-start w-48">
                  Button 3
                </Button>
                <Button variant={"outline"} className="self-start w-48">
                  Button 4
                </Button>
                <Button variant={"outline"} className="self-start w-48">
                  Button 5
                </Button>
                <Button variant={"outline"} className="self-start w-48">
                  Fiók törlése
                </Button>
              </div>
            </div>
            <div className="flex-1 ml-4 md:ml-16 pt-4 md:pt-10 pl-4 md:pl-10 border border-black rounded-lg bg-slate-900 overflow-y-auto">
              <div className="flex flex-col md:flex-row md:space-x-16 space-y-4 md:space-y-0 items-start md:items-center">
                <div className="flex flex-col space-y-4 w-full md:w-auto">
                  <Label htmlFor="lastname">Vezetéknév</Label>
                  <Input
                    id="lastname"
                    className="w-full max-w-[12rem]"
                    defaultValue={"Kis"}
                  />
                </div>
                <div className="flex flex-col space-y-4 w-full md:w-auto">
                  <Label htmlFor="firstname">Keresztnév</Label>
                  <Input
                    id="firstname"
                    className="w-full max-w-[12rem]"
                    defaultValue={"János"}
                  />
                </div>
                <div className="flex flex-col space-y-4 w-full md:w-auto">
                  <Label htmlFor="username">Felhasználónév</Label>
                  <Input
                    id="username"
                    className="w-full max-w-[12rem]"
                    defaultValue={"kisjanos88"}
                  />
                </div>
                <div className="md:ml-4">
                  <Label className="mb-4 block">Profilkép</Label>
                  <div>
                    <div
                      className="w-16 h-16 rounded-full cursor-pointer overflow-hidden"
                      onClick={() => document.getElementById("avatar")?.click()}
                    >
                      <Image
                        src={logo}
                        alt="Profile"
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <input
                      type="file"
                      id="avatar"
                      accept="image/*"
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
                </div>
              </div>
              <div className="flex justify-center space-x-4 w-full mt-8 md:mt-28">
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
