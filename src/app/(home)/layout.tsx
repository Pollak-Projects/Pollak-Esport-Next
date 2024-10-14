import type { Metadata } from "next";
import "@/app/globals.css";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";

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
    <html lang="hu">
      <body className="antialiased pt-[80px] dark min-h-screen">
        <Navbar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
