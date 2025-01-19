import "@/app/globals.css";
import Providers from "./providers";
import { AuthProvider } from "@/components/providers/AuthProvider";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hu">
      <body className="antialiased dark min-h-screen w-full bg-gradient-to-t from-purple-950/90 from-[3.6%] to-[90.4%] to-background">
        <AuthProvider>
          <Providers>
            <Navbar />
            {children}
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
