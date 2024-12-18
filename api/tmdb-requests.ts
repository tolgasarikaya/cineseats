import { Movie } from "@/types";
import catchAsync from "@/utils/catch-async";

const BASE_URL = "https://api.themoviedb.org/3";

const getHeaders = () => ({
  Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
  "Content-Type": "application/json",
});

export const getNowPlayingPopular = () =>
  catchAsync<{ results: Movie[] }>(() =>
    fetch(
      `${BASE_URL}/movie/now_playing?sort_by=popularity.desc&language=en-US&page=1`,
      { headers: getHeaders() }
    )
  ).then((data) =>
    data.results.slice(0, 10).map(({ backdrop_path, id, overview, title }) => ({
      backdrop_path,
      id,
      overview,
      title,
    }))
  );
