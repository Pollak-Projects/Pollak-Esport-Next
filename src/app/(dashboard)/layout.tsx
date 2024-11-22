import type { Metadata } from "next";
import "@/app/globals.css";
import { Toaster } from "@/components/ui/sonner";
import AdminNavbar from "./components/NavbarForLoggedIn";

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
      <body className="antialiased dark h-screen">
        <AdminNavbar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
