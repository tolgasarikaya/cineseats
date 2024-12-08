"use client";
import { Icons } from "@/components/icons";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

export default function LoginButton() {
  const [displayPopup, setDisplayPopup] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setDisplayPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <div
        ref={buttonRef}
        onClick={() => setDisplayPopup((prev) => !prev)}
        className="flex flex-row items-center gap-2 text-black rounded-xl bg-white py-2 px-4 cursor-pointer"
      >
        <Icons.Login className="w-8 h-8 font-semibold text-rose-600" />
        <p className="flex flex-col text-sm">
          Login<span>or Signup</span>
        </p>
      </div>
      {displayPopup && (
        <div
          ref={popupRef}
          className="p-4 bg-white w-[400px] absolute right-0 -bottom-40 h-[130px] rounded-2xl text-black"
        >
          <div className="flex flex-row items-center justify-between">
            <Link
              href="/login"
              onClick={() => setDisplayPopup(false)}
              className="w-[150px] text-center py-2 rounded-lg bg-rose-600 text-white"
            >
              Login
            </Link>
            <Link
              href="/signup"
              onClick={() => setDisplayPopup(false)}
              className="w-[150px] text-center py-2 rounded-lg border-rose-600 text-rose-600 border-2"
            >
              Sign Up
            </Link>
          </div>
          <p className="text-sm px-6 text-center mt-4">
            If you don&apos;t have an account, click signup to create one.
          </p>
        </div>
      )}
    </div>
  );
}
