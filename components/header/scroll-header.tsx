"use client";

import { useEffect, useState } from "react";

export default function ScrollHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`sticky lg:fixed top-0 left-0 right-0 transition-colors duration-300 z-50 ${
        isScrolled ? "bg-[#1e1e1e]" : "bg-transparent"
      }`}
    >
      {children}
    </div>
  );
}
