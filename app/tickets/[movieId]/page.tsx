import { MovieDetails } from "@/types";
import Image from "next/image";
import { BookingSteps } from "@/components/tickets/booking-steps";

export default async function TicketBooking({
  params,
}: {
  params: { movieId: string };
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-movie?id=${params.movieId}`
  );
  const movie: MovieDetails = await response.json();

  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-6 mb-8 md:mt-20">
          <div className="relative w-24 h-36 rounded-lg overflow-hidden">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">
              {movie.title}
            </h1>
            <p className="text-gray-400">Booking Tickets</p>
          </div>
        </div>

        <BookingSteps movieId={params.movieId} />
      </div>
    </div>
  );
}
