import type { Metadata } from "next";
import Script from "next/script";
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
      <Script
        src="https://umami.gemes.eu/script.js"
        data-website-id="923394af-d972-4518-85e7-6ded41da33a9"
        defer
      />
      <NavbarForLoggedIn />
      {children}
    </>
  );
}
