import MovieGrid from "@/components/movie-grid/movie-grid";

export const dynamic = "force-dynamic";
export default function Upcoming() {
  return <MovieGrid type="upcoming" />;
}
