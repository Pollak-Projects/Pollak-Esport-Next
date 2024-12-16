import type { Metadata } from "next";
//import Navbar from "@/app/(home)/components/Navbar";
import NavbarForLoggedIn from "@/app/(home)/components/NavbarForLoggedIn";

export const metadata: Metadata = {
  title: "Pollák ESport",
  description: "Pollák ESport oldal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <NavbarForLoggedIn />
        {children}
    </>
  );
}
