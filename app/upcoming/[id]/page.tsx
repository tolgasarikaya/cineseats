import MovieDetail from "@/components/movie-detail/movie-detail";

export default async function MovieDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <MovieDetail movieId={id} type="upcoming" />;
}
