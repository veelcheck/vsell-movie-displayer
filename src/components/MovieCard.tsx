import { ThumbsUp, ThumbsDown } from "lucide-react";
import { useEffect, useState } from "react";
import type { MovieCardProps } from "../types";

const MovieCard = ({ Poster, Title, Year }: MovieCardProps) => {
  const [vote, setVote] = useState<"like" | "dislike" | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(`vote-${Title}`);
    if (stored === "like" || stored === "dislike") {
      setVote(stored);
    }
  }, [Title]);

  const handleLike = () => {
    const newVote = vote === "like" ? null : "like";
    setVote(newVote);
    localStorage.setItem(`vote-${Title}`, newVote ?? "");
  };

  const handleDislike = () => {
    const newVote = vote === "dislike" ? null : "dislike";
    setVote(newVote);
    localStorage.setItem(`vote-${Title}`, newVote ?? "");
  };
  return (
    <>
      <h2
        className="text-xl bg-secondary-500-alpha px-4 py-2 w-full rounded-t-md h-[80px] flex items-center justify-center
        ">
        {Title}
      </h2>
      <div className="">
        <img
          src={
            Poster === "N/A"
              ? "https://dummyimage.com/300x450/332d56/e3eeb2&text=No+Image"
              : Poster
          }
          alt={
            Poster === "N/A" ? "No photo available" : `movie poster of ${Title}`
          }
          className="w-full h-auto"
        />
        <p className="bg-primary-500-alpha px-4 py-2 absolute bottom-0 w-full rounded-b-md flex justify-between items-center">
          <span>
            <ThumbsDown
              onClick={handleDislike}
              className={`cursor-pointer transition-colors ${
                vote === "dislike" ? "text-rose-900" : "text-inherit"
              }`}
            />
          </span>
          {Year}
          <span>
            <ThumbsUp
              onClick={handleLike}
              className={`cursor-pointer transition-colors ${
                vote === "like" ? "text-green-500" : "text-inherit"
              }`}
            />
          </span>
        </p>
      </div>
    </>
  );
};

export default MovieCard;
