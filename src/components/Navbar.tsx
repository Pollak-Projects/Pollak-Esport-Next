"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
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
import {
  User,
  Users,
  LogOut,
  Gamepad2,
  Settings,
  LogIn,
  Shield,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import { AdminCheck, UserCheck } from "@/lib/PermissionCheck";

const Links = [
  { title: "Kezdőlap", link: "/" },
  { title: "Játékok", link: "/games" },
  { title: "Csapatok", link: "/teams" },
];

export default function Navbar() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const img = document.createElement("img");
    img.src = logo.src;
    img.onload = () => setIsLoading(false);
  }, []);

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signOut({ redirect: false });
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed");
    } finally {
      setIsLoading(false);
    }
  };

  const renderNavLinks = () => (
    <ul className="flex gap-4 text-2xl items-center max-md:hidden">
      {Links.map((link) => (
        <li key={link.title}>
          <Link
            href={link.link}
            className={link.link === pathname ? "text-white/50" : "text-white"}
          >
            {link.title}
          </Link>
        </li>
      ))}
    </ul>
  );

  const renderMobileMenu = () => (
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
            {Links.map((link) => (
              <li key={link.title}>
                <Link
                  href={link.link}
                  className={
                    link.link === pathname ? "text-white/50" : "text-white"
                  }
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );

  const renderAuthContent = () => {
    if (isLoading) {
      return <Skeleton className="w-[50px] h-[50px] rounded-full" />;
    }

    if (user) {
      return (
        <UserCheck>
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full p-0">
              {user?.image ? (
                <Image
                  width={50}
                  height={50}
                  src={user.image}
                  alt="profile"
                  className="rounded-full"
                  priority
                />
              ) : (
                <div className="w-[50px] h-[50px] rounded-full bg-primary flex items-center justify-center">
                  {user?.name?.charAt(0) || "U"}
                </div>
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                {user?.name || "Felhasználó"}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href="/profile">
                <DropdownMenuItem>
                  <User />
                  Fiókom
                </DropdownMenuItem>
              </Link>
              <Link href="/myteam">
                <DropdownMenuItem>
                  <Users />
                  Csapatom
                </DropdownMenuItem>
              </Link>
              <Link href="/games/0">
                <DropdownMenuItem>
                  <Gamepad2 />
                  Versenyeim
                </DropdownMenuItem>
              </Link>
              <AdminCheck>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="font-bold">
                  Admin
                </DropdownMenuLabel>
                <Link href="/admin/users">
                  <DropdownMenuItem>
                    <Shield className="mr-2" />
                    Felhasználók kezelése
                  </DropdownMenuItem>
                </Link>
                <Link href="/admin/games/0">
                  <DropdownMenuItem>
                    <Gamepad2 className="mr-2" />
                    Versenyek kezelése
                  </DropdownMenuItem>
                </Link>
              </AdminCheck>
              <DropdownMenuSeparator />
              <Link href="/settings">
                <DropdownMenuItem>
                  <Settings />
                  Beállítások
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut />
                Kijelentkezés
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </UserCheck>
      );
    }

    return (
      <div className="flex gap-4">
        <Link href="/login">
          <Button variant="outline">
            <LogIn className="mr-2" />
            Bejelentkezés
          </Button>
        </Link>
      </div>
    );
  };

  return (
    <header className="w-[100dvw] pt-10 flex justify-between items-center md:px-20 max-md:pl-10 h-[80px] absolute top-0">
      <div className="flex gap-10 items-center max-md:w-full">
        <div className="max-md:flex max-md:w-full max-md:justify-between max-md:items-center max-md:flex-row-reverse">
          {renderMobileMenu()}
          {isLoading ? (
            <Skeleton className="w-[70px] h-[70px] rounded-full" />
          ) : (
            <Link href="/">
              <Image alt="logo" src={logo} width={70} height={70} priority />
            </Link>
          )}
        </div>
        <nav>{renderNavLinks()}</nav>
      </div>
      <div className="max-md:hidden">{renderAuthContent()}</div>
    </header>
  );
}
