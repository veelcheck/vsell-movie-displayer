import { useEffect, useState } from "react";
import { LoaderPinwheel } from "lucide-react";
import axios from "axios";

import "./App.css";
import MovieList from "./components/MovieList";
import useDebounce from "./hooks/useDebounce";

import ThemeToggleButton from "./components/ThemeToggleButton";
import usePagination from "./hooks/usePagination";

const App = () => {
  const [queryTitle, setQueryTitle] = useState<string>("");
  const debounceQuery = useDebounce(queryTitle);
  const [isLoading, setIsLoading] = useState(false);

  const [movies, setMovies] = useState([]);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const { handleNext, handlePrev } = usePagination({ totalResults, setPage });

  useEffect(() => {
    const BASE_URL = "https://www.omdbapi.com/";
    const apiKey = import.meta.env.VITE_API_KEY;

    const fetchData = async () => {
      if (!debounceQuery) return;

      setIsLoading(true);

      try {
        const response = await axios.get(BASE_URL, {
          params: {
            apiKey,
            s: debounceQuery,
            page,
          },
        });

        if (response.data.Response === "True") {
          setMovies(response.data.Search);
          setTotalResults(Number(response.data.totalResults));
          setError(null);
        } else {
          setMovies([]);
          setError(response.data.Error);
        }
      } catch (error) {
        console.error("Error message:", error);
        setError("Failed to fetch movie, terribly sorry :(");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [debounceQuery, page]);

  // Reset to page one when new request
  useEffect(() => {
    setPage(1);
  }, [debounceQuery]);

  return (
    <main className="bg-primary-500 dark:bg-dark-primary-500 font-ABeeZee text-secondary-400 min-h-dvh text-center">
      <div className="bg-dark-primary-500 dark:bg-secondary-500 flex w-full items-center justify-center gap-4 p-2">
        <h1 className="font-Limelight text-secondary-500 animate-slide text-2xl sm:text-3xl dark:text-rose-900">
          Fancy a movie?
        </h1>
        <ThemeToggleButton />
      </div>
      <form
        className="my-4 flex items-center justify-center gap-2"
        onSubmit={(e) => e.preventDefault()}
      >
        <label htmlFor="movie" className="sr-only">
          Search movies
        </label>
        <input
          className="bg-secondary-400 text-dark-primary-500 border-secondary-500 z-10 rounded-md border-2 p-2 focus:outline-rose-900"
          id="movie"
          type="text"
          placeholder="Search by title..."
          value={queryTitle}
          onChange={(e) => setQueryTitle(e.target.value)}
        ></input>

        <button
          type="button"
          className="bg-hover text-dark-primary-500 border:dark-primary-500 dark:border-primary-500 cursor-pointer rounded-md border-2 px-6 py-2 font-bold"
          onClick={() => setQueryTitle("")}
        >
          Clear
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}

      {isLoading ? (
        <div className="flex justify-center py-8">
          <LoaderPinwheel className="text-dark-primary-500 dark:text-secondary-400 size-20 animate-spin" />
        </div>
      ) : (
        <MovieList movies={movies} />
      )}
      {movies.length > 0 && (
        <div className="bg-primary-500-alpha sticky bottom-0 flex justify-center gap-16 p-2">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className="bg-dark-primary-500 text-primary-500 dark:border-primary-500 cursor-pointer rounded-md border px-6 py-2 disabled:hidden dark:border"
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            className="bg-dark-primary-500 text-primary-500 dark:border-primary-500 cursor-pointer rounded-md px-6 py-2 disabled:hidden dark:border"
            disabled={page >= Math.ceil(totalResults / 10)}
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
};

export default App;
