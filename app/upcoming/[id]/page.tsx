import MovieDetail from "@/components/movie-detail/movie-detail";

interface MovieDetailPageProps {
  params: {
    id: string;
  };
}

export default function MovieDetailPage({ params }: MovieDetailPageProps) {
  return <MovieDetail movieId={params.id} type="upcoming" />;
}
