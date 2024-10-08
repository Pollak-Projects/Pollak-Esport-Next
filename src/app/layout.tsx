import type { Metadata } from "next";
import "./globals.css";


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
      <body
        className="antialiased"
      >
        {children}
      </body>
    </html>
  );
}
