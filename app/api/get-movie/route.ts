import { NextResponse } from "next/server";
import { MovieDetails } from "@/types";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Movie ID is required" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${process.env.TMDB_URL}/movie/${id}?language=en-US`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movie");
    }

    const data = await response.json();

    const movie: MovieDetails = {
      backdrop_path: data.backdrop_path,
      poster_path: data.poster_path,
      id: data.id,
      overview: data.overview,
      title: data.title,
      genres: data.genres,
      release_date: data.release_date,
      runtime: data.runtime,
      status: data.status,
      tagline: data.tagline,
      vote_average: data.vote_average,
      budget: data.budget,
    };

    return NextResponse.json(movie);
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: "Failed to fetch movie" },
      { status: 500 }
    );
  }
}
