import { ReactNode } from "react";
import type { Metadata } from "next";
import { Space_Grotesk, Poppins } from "next/font/google";
import { Toaster } from "sonner";

import "./globals.css";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";

export const metadata: Metadata = {
  title: "CineSeats",
  description: "Modern cinema seat reservation system",
};

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${poppins.variable} font-sans bg-black min-h-screen relative text-white antialiased`}
      >
        <Toaster />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
