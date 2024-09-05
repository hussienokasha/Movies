export interface SearchResponse {
  page: number;
  total_pages: number;
  total_results: number;
  results: SearchResult[];
}
export interface SearchResult {
  backdrop_path: string;
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string;
  media_type: string;
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  first_air_date: string;
  vote_average: number;
  vote_count: string;
  origin_country: string[];
}
