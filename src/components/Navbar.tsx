import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const Navbar = ({ active }: { active: string }) => {
  const Links = [
    {
      title: "Home",
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
  console.log();
  return (
    <header className="w-full bg-slate-900 flex justify-between items-center px-20 h-[80px]">
      <div className="flex gap-10 items-center">
        <div className="text-3xl">Pollák Esport</div>
        <nav>
          <ul className="flex gap-4 text-2xl items-center">
            {Links.map((link) => {
              if (link.link == active) {
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

export default Navbar;
