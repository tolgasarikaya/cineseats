import MovieDetail from "@/components/movie-detail/movie-detail";

interface PageProps {
  params: { id: string; type: string };
}

export default function MovieDetailPage({ params }: PageProps) {
  return <MovieDetail movieId={params.id} type="current" />;
}
