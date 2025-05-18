import MovieCard from "./MovieCard";
import type { MovieListProps } from "../types";

const MovieList = ({ movies }: MovieListProps) => {
  return (
    <section className="">
      <ul className="grid gap-4 md:grid-cols-[repeat(auto-fit,300px)] justify-center">
        {movies.map((movie) => (
          <li
            key={movie.Title}
            className="rounded-md h-[530px] border border-primary-400 overflow-hidden relative">
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
