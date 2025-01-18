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
        data-website-id="7387da7d-ce22-48c2-b9e0-8eba469d4262"
        defer
      />
      <NavbarForLoggedIn />
      {children}
    </>
  );
}
