"use client";
import { useRef } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

interface MovieListWrapperProps {
  children: React.ReactNode;
}

export const MovieListWrapper = ({ children }: MovieListWrapperProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;

    const scrollAmount = direction === "left" ? -400 : 400;
    sliderRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const buttonClasses =
    "absolute top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full text-black cursor-pointer hover:bg-white transition-colors hidden md:block opacity-0 group-hover:opacity-100 z-20";

  return (
    <div className="relative group">
      <div
        ref={sliderRef}
        className="relative overflow-x-auto ml-4 mt-5 scrollbar-hide"
      >
        {children}
      </div>

      <button
        aria-label="Scroll left"
        className={`${buttonClasses} left-0 z-30`}
        onClick={() => scroll("left")}
      >
        <IoChevronBack size={24} />
      </button>

      <button
        aria-label="Scroll right"
        className={`${buttonClasses} right-0 z-30`}
        onClick={() => scroll("right")}
      >
        <IoChevronForward size={24} />
      </button>
    </div>
  );
};
