export interface Anctor {
  name: string;
  role: string;
}

export interface moviceImf {
  filmId: number;
  name: string;
  category: string;
  synopsis: string;
  poster: string;
  grade: string;
  actors: Array<Anctor>;
  runtime: number;
  nation: string;
}
