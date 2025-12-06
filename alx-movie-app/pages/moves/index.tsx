import Button from "@/components/commons/Button";
import Loading from "@/components/commons/Loading";
import MovieCard from "@/components/commons/MovieCard";
import { MovieProps } from "@/interfaces";
import { useCallback, useEffect, useState } from "react";

const Movies: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [year, setYear] = useState<number | null>(null);
  const [genre, setGenre] = useState<string | null>(null);
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchMovies = useCallback(async () => {
    setLoading(true);

    const response = await fetch("/api/fetch-movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        page,
        year,
        genre: genre === "All" ? "" : genre,
      }),
    });

    if (!response.ok) {
      setLoading(false);
      throw new Error("Something went wrong");
    }

    const data = await response.json();
    setMovies(data.movies || []);
    setLoading(false);
  }, [page, year, genre]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <div className="min-h-screen bg-[#110F17] text-white px-4 md:px-10 lg:px-44">
      <div className="py-16">
        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between mb-4 items-center space-x-0 md:space-x-4">
          <input
            type="text"
            placeholder="Search for movies..."
            className="border-2 w-full md:w-96 border-[#E2D609] bg-transparent px-4 py-2 rounded-full text-white placeholder-gray-400 outline-none"
          />

          <select
            onChange={(e) =>
              setYear(e.target.value ? Number(e.target.value) : null)
            }
            className="border-2 border-[#E2D609] outline-none bg-transparent px-4 md:px-8 py-2 mt-4 md:mt-0 rounded-full w-full md:w-auto"
          >
            <option value="">Select Year</option>
            {[2024, 2023, 2022, 2021, 2020, 2019, 2018].map((yr) => (
              <option key={yr} value={yr}>
                {yr}
              </option>
            ))}
          </select>
        </div>

        <p className="text-[#E2D609] text-xl mt-6 mb-6">Online Streaming</p>

        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <h1 className="text-lg md:text-6xl font-bold">
            {year || ""} {genre || ""} Movie List
          </h1>

          <div className="flex flex-wrap space-x-0 md:space-x-4 mt-4 md:mt-0">
            {["All", "Animation", "Comedy", "Fantasy"].map((g, idx) => (
              <Button key={idx} title={g} action={() => setGenre(g)} />
            ))}
          </div>
        </div>

        {/* Movies Output */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 mt-10">
          {movies.map((movie, index) => (
            <MovieCard
              key={index}
              title={movie.titleText.text}
              posterImage={movie.primaryImage?.url}
              releaseYear={movie.releaseYear.year}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-end space-x-4 mt-6">
          <Button
            title="Previous"
            action={() => setPage((prev) => (prev > 1 ? prev - 1 : 1))}
          />
          <Button title="Next" action={() => setPage(page + 1)} />
        </div>
      </div>

      {loading && <Loading />}
    </div>
  );
};

export default Movies;
