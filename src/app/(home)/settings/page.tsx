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
      <Card className="w-4/12 h-4/5 mt-10">
        <CardHeader>
          <CardTitle className="text-left text-5xl">Felhasználó</CardTitle>
        </CardHeader>
        <CardContent className="w-full">
          <div className="flex flex-col-reverse w-full">
            <div className="flex justify-end w-full my-10">
              <Button
                variant={"outline"}
                className="self-start w-48 border-red-600 !text-red-600"
              >
                Fiók törlése
              </Button>
            </div>
            <div className="flex-1 pt-4 pl-4 md:pl-10 border border-black rounded-lg bg-slate-900 overflow-y-auto">
              <div className="flex flex-col-reverse md:space-x-16 space-y-4 md:space-y-0">
                <div className="flex gap-2 mr-10">
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
                </div>
                <div className="!ml-0 flex w-ful flex-col !mb-[60px]">
                  <div className="m-auto">
                    <div
                      className="rounded-full cursor-pointer overflow-hidden"
                      onClick={() => document.getElementById("avatar")?.click()}
                    >
                      <Image
                        src={logo}
                        alt="Profile"
                        width={200}
                        height={200}
                        className="hover:brightness-50 transition"
                      />
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
              <div className="flex justify-end py-5 px-10 space-x-4 w-full mt-8 md:mt-28">
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
