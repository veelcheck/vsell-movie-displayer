import MovieCard from "./MovieCard";
import type { MovieListProps } from "../types";

const MovieList = ({ movies }: MovieListProps) => {
  return (
    <section className="">
      <ul className="grid justify-center gap-4 md:grid-cols-[repeat(auto-fit,300px)]">
        {movies.map((movie) => (
          <li
            key={movie.Title}
            className="border-primary-400 relative h-[530px] overflow-hidden rounded-md border"
          >
            <MovieCard
              Title={movie.Title}
              Year={movie.Year}
              Poster={movie.Poster}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MovieList;
