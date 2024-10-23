"use client";

import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

const AdminNavbar = () => {
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
      title: "Csapat létrehozása",
      link: "/newteam",
    },
  ];
  const pathname = usePathname();
  return (
    <header className="w-full border-b-[1px] border-b-border flex justify-between items-center px-20 h-[80px]">
      <div className="flex gap-10 items-center">
        <div className="text-3xl">Pollák Esport</div>
        <nav>
          <ul className="flex gap-4 text-2xl items-center">
            {Links.map((link) => {
              if (link.link === pathname) {
                return (
                  <li key={link.title}>
                    <Link
                      href={link.link}
                      className="text-muted transition-all"
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
      <div className="">
        <Button>Bejelentkezés</Button>
      </div>
    </header>
  );
};

export default AdminNavbar;
