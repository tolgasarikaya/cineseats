import { Icons } from "@/components/icons";
import Link from "next/link";
import LoginButton from "./login-button/login-button";
import ScrollHeader from "./scroll-header";

export default function Header() {
  const logo = (
    <Link href="/" className="text-2xl lg:text-3xl font-bold">
      <span className="text-white">Cine</span>
      <span className="bg-gradient-to-r from-amber-500 via-rose-400 to-purple-500 text-transparent bg-clip-text">
        Seats
      </span>
    </Link>
  );

  return (
    <ScrollHeader>
      <div className="font-heading h-[10vh] max-h-[60px] min-h-[40px] px-6 flex flex-row justify-between items-center lg:hidden">
        <Icons.Bars />
        {logo}
        <Icons.Search />
      </div>

      <div className="font-heading h-[10vh] px-28 hidden justify-between items-center text-lg font-semibold lg:flex flex-row">
        {logo}
        <Link href="/movies" className="hover:text-gray-300 transition-colors">
          Movies
        </Link>
        <Link
          href="/upcoming"
          className="hover:text-gray-300 transition-colors"
        >
          Upcoming
        </Link>
        <div className="flex flex-row items-center gap-1 hover:text-gray-300 transition-colors cursor-pointer">
          <Icons.Search />
          Search
        </div>
        <LoginButton />
      </div>
    </ScrollHeader>
  );
}
