import type { Metadata } from "next";
import "@/app/globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu">
      <body className="antialiased dark min-h-screen w-full bg-gradient-to-t  from-purple-950/90 from-[3.6%] to-[90.4%] to-background ">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
