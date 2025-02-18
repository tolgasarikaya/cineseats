import { Movie } from "@/types";
import Image from "next/image";
import { MovieListWrapper } from "./movie-list-wrapper";
import { BsTicketPerforated } from "react-icons/bs";
import { IoInformationCircleOutline } from "react-icons/io5";
import Link from "next/link";
import { NotifyButton } from "../buttons/notify-button";

interface MovieListProps {
  type: "now-playing" | "upcoming";
}

const MovieList = async ({ type }: MovieListProps) => {
  const endpoint =
    type === "now-playing" ? "now-playing-movies" : "upcoming-movies";
  const movieData = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/${endpoint}`
  );
  const movies: Movie[] = await movieData.json();

  const listConfig = {
    "now-playing": {
      title: "Now Playing",
      allLink: "/movies",
      detailsLink: (id: number) => `/movies/${id}`,
    },
    upcoming: {
      title: "Upcoming Movies",
      allLink: "/upcoming",
      detailsLink: (id: number) => `/upcoming/${id}`,
    },
  };

  const config = listConfig[type];

  return (
    <div className="md:mx-10">
      <header className="text-white mx-4 mt-10 flex justify-between items-center">
        <h2 className="font-[500] text-sm md:text-lg lg:text-3xl">
          {config.title}
        </h2>
        <Link
          href={config.allLink}
          className="underline text-sm md:text-base lg:text-xl hover:text-gray-300 transition-colors"
        >
          All
        </Link>
      </header>

      <MovieListWrapper>
        <div className="flex gap-4 pr-4 min-w-full">
          {movies.map((movie) => (
            <article key={movie.id} className="flex flex-col gap-2">
              <div className="relative h-[240px] w-[160px] md:h-[300px] md:w-[200px] lg:h-[360px] lg:w-[240px] flex-shrink-0 rounded-lg overflow-hidden">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  fill
                  className="object-cover transition-transform duration-200"
                  sizes="(min-width: 1024px) 240px, (min-width: 768px) 200px, 160px"
                />

                <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-all duration-200 z-20">
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
                      <span>Review</span>
                    </Link>
                  </div>
                </div>
              </div>

              <h3 className="text-white font-semibold text-sm md:text-base lg:text-lg truncate w-[160px] md:w-[200px] lg:w-[240px]">
                {movie.title}
              </h3>
            </article>
          ))}
        </div>
      </MovieListWrapper>
    </div>
  );
};

export default MovieList;
