import Image from "next/image";
import { MovieDetails } from "@/types";
import Link from "next/link";
import { NotifyButton } from "../buttons/notify-button";
import { BsTicketPerforated } from "react-icons/bs";

interface MovieDetailProps {
  movieId: string;
  type: "current" | "upcoming";
}

export default async function MovieDetail({ movieId, type }: MovieDetailProps) {
  const response = await fetch(
    `${process.env.BASE_URL}/api/get-movie?id=${movieId}`
  );
  const movie: MovieDetails = await response.json();

  return (
    <div className="min-h-screen">
      <div className="relative w-full h-[60vh]">
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-64 flex-shrink-0 mx-auto md:mx-0">
            <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {movie.title}
            </h1>

            {movie.tagline && (
              <p className="text-gray-400 text-lg italic mb-4">
                {movie.tagline}
              </p>
            )}

            <div className="flex gap-4 text-gray-300 mb-4">
              <span>{new Date(movie.release_date).getFullYear()}</span>
              <span>•</span>
              <span>
                {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
              </span>
              <span>•</span>
              <span>{movie.status}</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <p className="text-gray-300 mb-8 leading-relaxed">
              {movie.overview}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
              <div>
                <h3 className="text-gray-400 text-sm mb-1">Rating</h3>
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium text-lg">
                    {movie.vote_average.toFixed(1)}
                  </span>
                  <span className="text-yellow-500">★</span>
                </div>
              </div>
              {movie.budget > 0 && (
                <div>
                  <h3 className="text-gray-400 text-sm mb-1">Budget</h3>
                  <p className="text-white font-medium">
                    ${(movie.budget / 1000000).toFixed(1)}M
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-4">
              {type === "current" ? (
                <Link
                  href={`/tickets/${movie.id}`}
                  className="px-8 py-3 bg-purple-500 hover:bg-purple-600 rounded-lg text-white text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <BsTicketPerforated />
                  <span>Buy Ticket</span>
                </Link>
              ) : (
                <NotifyButton />
              )}
              <Link
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                  movie.title
                )}`}
                target="_blank"
                className="px-8 py-3 border border-white hover:bg-white/10 rounded-lg text-white text-sm font-medium transition-colors"
              >
                Watch Trailer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
