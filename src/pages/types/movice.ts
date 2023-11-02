export interface anctorImf {
  name: string;
  role: string;
  avatarAddress?: string;
}

export interface moviceImf {
  filmId: number;
  name: string;
  category: string;
  synopsis: string;
  poster: string;
  grade: string;
  actors: Array<anctorImf>;
  runtime: number;
  nation: string;
}

export interface moviceParams {
  pageNum: number;
  pageSize: number;
  cityId: number;
  total: number;
}

export interface itemImf {
  name: string;
  type: number;
}

export interface filmTypeImf {
  name: string;
  value: number;
}

export interface detailsImf {
  actors: Array<anctorImf>;
  category: string;
  director: string;
  filmId: number;
  filmType: filmTypeImf;
  isPresale: boolean;
  isSale: boolean;
  item: itemImf;
  language: string;
  name: string;
  nation: string;
  photos: Array<string>;
  poster: string;
  premiereAt: number;
  runtime: number;
  synopsis: string;
  timeType: number;
  videoId: string;
}

export interface detailsResponseImf {
  data: {
    film: detailsImf;
  };
}
