"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";

import logo from "../tempimg/logo2.png";

const Navbar = () => {
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
      link: "/groups",
    },
  ];

  const pathname = usePathname();

  useEffect(() => {
    const img = document.createElement("img");
    img.src = logo.src;
    img.onload = () => setIsLoading(false);
  }, []);

  return (
    <header
      className={cn(
        "w-full border-b-[1px] border-b-border flex justify-between items-center md:px-20 max-md:pl-10 h-[80px] absolute top-0 ",
        { "border-0 pt-10": pathname === "/" }
      )}
    >
      <div className="flex gap-10 items-center max-md:w-full">
        <div className="max-md:flex max-md:w-full max-md:justify-between max-md:items-center max-md:flex-row-reverse">
          <div className="md:hidden flex flex-col justify-between w-[50px] h-[30px]">
            <div className="w-full h-0.5 bg-white"></div>
            <div className="w-full h-0.5 bg-white"></div>
            <div className="w-full h-0.5 bg-white"></div>
          </div>
          {isLoading ? (
            <Skeleton className="w-[70px] h-[70px] rounded-full" />
          ) : (
            <Image alt="logo" src={logo} width={70} height={70} priority />
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
        <Button>Bejelentkezés</Button>
      </div>
    </header>
  );
};

export default Navbar;
