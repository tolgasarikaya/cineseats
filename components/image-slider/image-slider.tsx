"use client";

import { getNowPlayingPopular } from "@/api/tmdb-requests";
import { Movie } from "@/types";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

export default function ImageSlider() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout>();

  const startInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setCurrentImageIndex((prev) => {
        if (prev === movies.length - 1) {
          return 0;
        }
        return prev + 1;
      });
    }, 5000);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getNowPlayingPopular();
        setMovies(data);
        startInterval();
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleDotClick = (index: number) => {
    setCurrentImageIndex(index);
    startInterval();
  };

  if (movies.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative w-full h-full">
      <div className="relative w-full">
        <Image
          src={`https://image.tmdb.org/t/p/original${movies[currentImageIndex].backdrop_path}`}
          alt={movies[currentImageIndex].title}
          width={1600}
          height={900}
          className={`w-full h-auto max-h-[800px] object-cover transition-opacity duration-300 ${
            isImageLoading ? "opacity-0" : "opacity-100"
          }`}
          priority
          onLoadingComplete={() => setIsImageLoading(false)}
          onLoad={() => setIsImageLoading(false)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/90" />
      </div>

      {!isImageLoading && (
        <>
          <div className="lg:absolute lg:h-[400px] lg:top-36 lg:pl-32 px-14 relative">
            <p className="text-center my-2 text-2xl lg:text-[50px] font-semibold lg:text-left lg:w-[800px] leading-tight lg:leading-tight">
              {movies[currentImageIndex].title}
            </p>
            <p className="hidden lg:flex w-[500px]">
              {movies[currentImageIndex].overview}
            </p>
            <div className="hidden lg:absolute lg:bottom-5 lg:flex lg:flex-row lg:gap-10">
              <button className="w-40 py-2 bg-purple-500 rounded-xl hover:bg-purple-600">
                Buy a Ticket
              </button>
              <button className="border-2 w-32 py-2 border-white rounded-xl hover:bg-purple-600 hover:border-purple-600">
                Review
              </button>
            </div>
          </div>

          <div className="lg:absolute lg:bottom-10 lg:left-1/2 lg:transform lg:-translate-x-1/2 flex flex-row justify-center gap-2">
            {movies.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`size-2 md:size-3 rounded-full transition-all ${
                  currentImageIndex === index
                    ? "bg-white w-6 lg:w-10"
                    : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
