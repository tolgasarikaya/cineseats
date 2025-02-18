import ImageSlider from "@/components/image-slider/image-slider";
import MovieList from "@/components/movie-lists/movie-list";

export const dynamic = "force-dynamic";
export default async function Home() {
  return (
    <div className="flex flex-col gap-16">
      <ImageSlider />
      <MovieList type="now-playing" />
      <MovieList type="upcoming" />
    </div>
  );
}
