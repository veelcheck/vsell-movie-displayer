// src/hooks/usePagination.ts
import { useCallback } from "react";

type UsePaginationProps = {
  totalResults: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const usePagination = ({ totalResults, setPage }: UsePaginationProps) => {
  const handleNext = useCallback(() => {
    setPage((prev) => (prev < Math.ceil(totalResults / 10) ? prev + 1 : prev));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [totalResults, setPage]);

  const handlePrev = useCallback(() => {
    setPage((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [setPage]);

  return { handleNext, handlePrev };
};

export default usePagination;
