import MovieDetail from "@/components/movie-detail/movie-detail";

type Props = {
  params: {
    id: string;
  };
};

export default function MovieDetailPage({ params }: Props) {
  return <MovieDetail movieId={params.id} type="upcoming" />;
}
