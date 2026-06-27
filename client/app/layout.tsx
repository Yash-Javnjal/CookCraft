import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import LenisProvider from "@/components/LenisProvider";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "CookCraft | Every Great Dish Begins with a Story",
  description: "A culinary journal for the modern home, where intuition meets ingredient. Rediscover the ritual of cooking through heritage recipes and sensory exploration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Montserrat:wght@400;600;700&family=Literata:ital,wght@0,400;1,400;1,600&family=Caveat:wght@400..700&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-on-surface paper-grain font-body-md overflow-x-hidden antialiased">
        <AuthProvider>
          <LenisProvider>
            <Navbar />
            <PageTransition>{children}</PageTransition>
            <Footer />
          </LenisProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}

