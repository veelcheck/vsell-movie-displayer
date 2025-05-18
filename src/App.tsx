import { useEffect, useState } from "react";
import "./App.css";
import MovieList from "./components/MovieList";
import useDebounce from "./hooks/useDebounce";
import axios from "axios";

function App() {
  const [queryTitle, setQueryTitle] = useState<string>("");
  const debounceQuery = useDebounce(queryTitle);

  const [movies, setMovies] = useState([]);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    const BASE_URL = "https://www.omdbapi.com/";
    const apiKey = import.meta.env.VITE_API_KEY;

    const fetchData = async () => {
      if (!debounceQuery) return;

      try {
        const response = await axios.get(BASE_URL, {
          params: {
            apiKey,
            s: debounceQuery,
            page,
          },
        });

        if (response.data.Response === "True") {
          console.log(response.data);
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
      }
    };

    fetchData();
  }, [debounceQuery, page]);

  // Reset to page one when new request
  useEffect(() => {
    setPage(1);
  }, [debounceQuery]);

  const handleNext = () => {
    setPage((p) => (p < Math.ceil(totalResults / 10) ? p + 1 : p));
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handlePrev = () => {
    setPage((p) => Math.max(p - 1, 1));
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main className="bg-primary-500 min-h-dvh text-center p-2 font-ABeeZee text-secondary-400 ">
      <h1 className="font-Limelight bg-secondary-500 px-6 py-4 rounded-md text-3xl text-rose-900">
        Fancy a movie? Try the browser!
      </h1>
      <form
        className="my-4 flex gap-2 items-center justify-center"
        onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="movie"></label>
        <input
          className="bg-secondary-400 text-primary-500 p-2 rounded-md border-2 border-secondary-500"
          id="movie"
          type="text"
          placeholder="Search by title..."
          value={queryTitle}
          onChange={(e) => setQueryTitle(e.target.value)}></input>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      <MovieList movies={movies} />
      {movies.length > 0 && (
        <div className="flex justify-center gap-16 p-2">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className="bg-secondary-400 px-6 py-2 text-primary-500 rounded-md disabled:bg-gray-300 cursor-pointer disabled:cursor-not-allowed">
            Prev
          </button>
          <button
            onClick={handleNext}
            disabled={page >= Math.ceil(totalResults / 10)}
            className="bg-secondary-400 px-6 py-2 text-primary-500 rounded-md disabled:bg-gray-300 cursor-pointer disabled:cursor-not-allowed">
            Next
          </button>
        </div>
      )}
    </main>
  );
}

export default App;
