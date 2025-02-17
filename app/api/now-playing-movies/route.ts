import { NextResponse } from "next/server";
import { Movie } from "@/types";

export async function GET() {
  try {
    const response = await fetch(
      `${process.env.TMDB_URL}/movie/now_playing?sort_by=popularity.desc&language=en-US&page=1&region=TR`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    const data = await response.json();

    const movies = data.results.map(
      ({ backdrop_path, poster_path, id, overview, title }: Movie) => ({
        backdrop_path,
        poster_path,
        id,
        overview,
        title,
      })
    );

    return NextResponse.json(movies);
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: "Failed to fetch movies" },
      { status: 500 }
    );
  }
}
