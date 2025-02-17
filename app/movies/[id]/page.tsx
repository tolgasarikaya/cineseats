import MovieDetail from "@/components/movie-detail/movie-detail";

export default function MovieDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return <MovieDetail movieId={params.id} type="current" />;
}
