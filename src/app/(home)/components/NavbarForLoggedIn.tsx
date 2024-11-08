"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Skeleton } from "../../../components/ui/skeleton";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from "@/tempimg/logo2.png";
import { User, Users, LogOut, Gamepad2 } from "lucide-react";

const NavbarForLoggedIn = () => {
  const [isLoading, setIsLoading] = useState(true);

  const Links = [
    {
      title: "Kezdőlap",
      link: "/",
    },
    {
      title: "Játékok",
      link: "/games",
    },
    {
      title: "Csapatok",
      link: "/teams",
    },
  ];

  const pathname = usePathname();

  useEffect(() => {
    const img = document.createElement("img");
    img.src = logo.src;
    img.onload = () => setIsLoading(false);
  }, []);

  return (
    <header className="w-[100dvw] pt-10 flex justify-between items-center md:px-20 max-md:pl-10 h-[80px] absolute top-0 ">
      <div className="flex gap-10 items-center max-md:w-full">
        <div className="max-md:flex max-md:w-full max-md:justify-between max-md:items-center max-md:flex-row-reverse">
          <Sheet>
            <SheetTrigger asChild>
              <button className="md:hidden flex flex-col justify-between w-[50px] h-[30px]">
                <div className="w-full h-0.5 bg-white"></div>
                <div className="w-full h-0.5 bg-white"></div>
                <div className="w-full h-0.5 bg-white"></div>
              </button>
            </SheetTrigger>
            <SheetContent className="bg-black/10 backdrop-blur-md">
              <SheetHeader>
                <SheetTitle className="text-3xl border-b-2 border-b-white pb-1">
                  Navigáció
                </SheetTitle>
                <SheetDescription></SheetDescription>
              </SheetHeader>
              <nav>
                <ul className="flex flex-col gap-4 text-2xl w-full items-start mt-3">
                  {Links.map((link) => {
                    if (link.link === pathname) {
                      return (
                        <li key={link.title}>
                          <Link
                            href={link.link}
                            className="text-white/50 transition-all"
                          >
                            {link.title}
                          </Link>
                        </li>
                      );
                    }
                    return (
                      <li className="" key={link.title}>
                        <Link href={link.link} className="text-white">
                          {link.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>

          {isLoading ? (
            <Skeleton className="w-[70px] h-[70px] rounded-full" />
          ) : (
            <Link href="/">
              <Image alt="logo" src={logo} width={70} height={70} priority />
            </Link>
          )}
        </div>

        <nav>
          <ul className="flex gap-4 text-2xl items-center max-md:hidden">
            {Links.map((link) => {
              if (link.link === pathname) {
                return (
                  <li key={link.title}>
                    <Link
                      href={link.link}
                      className="text-white/50 transition-all"
                    >
                      {link.title}
                    </Link>
                  </li>
                );
              }
              return (
                <li className="" key={link.title}>
                  <Link href={link.link}>{link.title}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <div className="max-md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger>
            {" "}
            <Image width={50} height={50} src={logo} alt="profile" priority />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>kisjanos88</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/login">
              <DropdownMenuItem className="hover:cursor-pointer">
                <User />
                Fiókom
              </DropdownMenuItem>
            </Link>
            <Link href="/myteam">
              <DropdownMenuItem className="hover:cursor-pointer">
                <Users />
                Csapatom
              </DropdownMenuItem>
            </Link>
            <Link href="/games/0">
              <DropdownMenuItem className="hover:cursor-pointer">
                <Gamepad2 />
                Versenyeim
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <Link href="/logout">
              <DropdownMenuItem className="hover:cursor-pointer">
                <LogOut />
                Kijelentkezés
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default NavbarForLoggedIn;
