import MovieDetail from "@/components/movie-detail/movie-detail";

type PageProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function MovieDetailPage({ params }: PageProps) {
  return <MovieDetail movieId={params.id} type="upcoming" />;
}
