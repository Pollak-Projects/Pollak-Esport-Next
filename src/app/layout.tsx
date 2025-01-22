import "@/app/globals.css";
import Providers from "../components/providers/Providers";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hu">
      <body className="antialiased dark min-h-screen w-full bg-gradient-to-t from-[#2f275c] bg-fixed bg-no-repeat from-[3.6%] to-[45%] to-background">
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
