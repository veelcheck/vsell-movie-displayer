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
      <h2 className="bg-secondary-500-alpha flex h-[80px] w-full items-center justify-center rounded-t-md px-4 py-2 text-xl">
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
          className="h-auto w-full"
        />
        <p className="bg-primary-500-alpha absolute bottom-0 flex w-full items-center justify-between rounded-b-md px-4 py-2">
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
