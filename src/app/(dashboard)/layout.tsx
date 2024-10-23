import type { Metadata } from "next";
import "@/app/globals.css";
import { Toaster } from "@/components/ui/sonner";
import AdminNavbar from "./components/AdminNavbar";

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
      <body className="antialiased dark">
        <AdminNavbar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
