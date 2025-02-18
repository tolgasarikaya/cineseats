import Image from "next/image";
import { Movie } from "@/types";
import Link from "next/link";
import { BsTicketPerforated } from "react-icons/bs";
import { IoInformationCircleOutline } from "react-icons/io5";
import { NotifyButton } from "@/components/buttons/notify-button";

interface MovieGridPageProps {
  type: "now-playing" | "upcoming";
}

const pageConfig = {
  "now-playing": {
    title: "Now Playing",
    endpoint: "now-playing-movies",
    detailsLink: (id: number) => `/movies/${id}`,
  },
  upcoming: {
    title: "Coming Soon",
    endpoint: "upcoming-movies",
    detailsLink: (id: number) => `/upcoming/${id}`,
  },
};

export default async function MovieGrid({ type }: MovieGridPageProps) {
  const config = pageConfig[type];
  const response = await fetch(`/api/${config.endpoint}`);
  const movies: Movie[] = await response.json();

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[40vh] md:h-[50vh] lg:h-[60vh]">
        <Image
          src="/images/cinema.jpg"
          alt="Movie popcorn and 3D glasses"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center px-4">
            {config.title}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
          {movies.map((movie: Movie) => (
            <div key={movie.id} className="relative group cursor-pointer">
              <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  fill
                  className="object-cover transition-transform duration-200 group-hover:scale-105"
                  sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-2">
                    {type === "now-playing" ? (
                      <Link
                        href={`/tickets/${movie.id}`}
                        className="flex items-center justify-center gap-2 w-full py-2 bg-purple-500 rounded-lg hover:bg-purple-600 text-white text-sm"
                      >
                        <BsTicketPerforated />
                        <span>Buy Ticket</span>
                      </Link>
                    ) : (
                      <NotifyButton />
                    )}
                    <Link
                      href={config.detailsLink(movie.id)}
                      className="flex items-center justify-center gap-2 w-full py-2 border border-white rounded-lg hover:bg-white/10 text-white text-sm"
                    >
                      <IoInformationCircleOutline size={18} />
                      <span>More Info</span>
                    </Link>
                  </div>
                </div>
              </div>
              <h3 className="mt-2 text-white font-medium truncate">
                {movie.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
