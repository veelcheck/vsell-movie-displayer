export type MovieCardProps = {
  Poster: string;
  Title: string;
  Year: string;
};

export type MovieListProps = {
  movies: MovieCardProps[];
};
