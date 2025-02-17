import { ReactNode } from "react";
import type { Metadata } from "next";
import { Toaster } from "sonner";

import "./globals.css";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";

export const metadata: Metadata = {
  title: "CineSeats",
  description: "Modern cinema seat reservation system",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`font-sans bg-black min-h-screen relative text-white antialiased`}
      >
        <Toaster />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
