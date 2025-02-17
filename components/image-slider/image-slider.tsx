"use client";

import { Movie } from "@/types";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { BsTicketPerforated } from "react-icons/bs";
import { IoInformationCircleOutline } from "react-icons/io5";

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
        if (prev >= movies.length - 1) {
          return 0;
        }
        return prev + 1;
      });
    }, 5000);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("/api/now-playing-movies");
        const data = await response.json();
        setMovies(data.slice(0, 10));
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

  useEffect(() => {
    if (movies.length > 0) {
      startInterval();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [movies]);

  const handleDotClick = (index: number) => {
    setCurrentImageIndex(index);
    startInterval();
  };

  if (movies.length === 0) {
    return (
      <div className="relative w-full h-auto max-h-[800px] aspect-[16/9] bg-black/90 animate-pulse">
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-white/80 text-lg">Loading movies...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <div className="relative w-full">
        <div
          className={`transition-opacity duration-300 ${
            isImageLoading ? "opacity-0" : "opacity-100"
          }`}
        >
          <Image
            src={`https://image.tmdb.org/t/p/original${movies[currentImageIndex]?.backdrop_path}`}
            alt={movies[currentImageIndex]?.title}
            width={1600}
            height={900}
            className="w-full h-auto max-h-[800px] object-cover"
            priority
            onLoadingComplete={() => setIsImageLoading(false)}
            onLoad={() => setIsImageLoading(false)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/90" />
        </div>

        {isImageLoading && (
          <div className="absolute inset-0 bg-black/90 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!isImageLoading && (
          <>
            <div className="lg:absolute lg:h-[400px] lg:top-36 lg:pl-32 px-14 relative">
              <p className="text-center my-2 text-2xl lg:text-[50px] font-semibold lg:text-left lg:w-[800px] leading-tight lg:leading-tight">
                {movies[currentImageIndex].title}
              </p>
              <p className="hidden lg:flex w-[500px]">
                {movies[currentImageIndex].overview}
              </p>
              <div className="hidden lg:absolute lg:bottom-5 lg:flex lg:flex-row lg:gap-4">
                <Link
                  href={`/tickets/${movies[currentImageIndex].id}`}
                  className="flex items-center justify-center gap-2 w-40 py-2 bg-purple-500 rounded-lg hover:bg-purple-600 text-white text-sm"
                >
                  <BsTicketPerforated />
                  <span>Buy Ticket</span>
                </Link>
                <Link
                  href={`/movies/${movies[currentImageIndex].id}`}
                  className="flex items-center justify-center gap-2 w-40 py-2 border border-white rounded-lg hover:bg-white/10 text-white text-sm"
                >
                  <IoInformationCircleOutline size={18} />
                  <span>Review</span>
                </Link>
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
    </div>
  );
}
