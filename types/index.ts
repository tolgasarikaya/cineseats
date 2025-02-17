export interface Movie {
  backdrop_path: string;
  poster_path: string;
  id: number;
  overview: string;
  title: string;
}

export interface MovieDetails extends Movie {
  genres: Array<{
    id: number;
    name: string;
  }>;
  release_date: string;
  runtime: number;
  status: string;
  tagline: string;
  vote_average: number;
  budget: number;
}
