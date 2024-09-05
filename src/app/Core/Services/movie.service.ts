import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { catchError, throwError } from 'rxjs';
import { TrendingResponse } from '../Models/trending';
import { MovieRespone } from '../Models/movies-list';
import { MovieDetails } from '../Models/movie-details';

export type SortBy =
  | 'top_rated'
  | 'top_rated.desc'
  | 'now_playing'
  | 'popular'
  | 'titleAZ'
  | 'titleZA'
  | 'popularity.asc'
  | 'release_date.asc'
  | 'release_date.desc';
@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}
  sortSignal = signal('');
  private apiUrl: string = environment.baseUrl;
  getMoviesLists({ sortBy, pageNum }: { sortBy: SortBy; pageNum: number }) {
    let params = new HttpParams();
    params = params.set('page', pageNum);

    if (sortBy == 'top_rated') {
      params = params.set('sort_by', 'vote_average.desc');
      params = params.set('without_genres', '99,10755');
      params = params.set('vote_count.gte', 200);
    }
    if (sortBy == 'now_playing') {
      params = params.set('sort_by', 'popularity.desc');
      params = params.set('with_release_type', 2 | 3);
    }
    if (sortBy == 'popular') {
      params = params.set('sort_by', 'popularity.desc');
    }
    if (sortBy == 'popularity.asc') {
      params = params.set('sort_by', 'popularity.asc');
    }
    if (sortBy == 'titleAZ') {
      params = params.set('sort_by', 'title.asc');
    }
    if (sortBy == 'titleZA') {
      params = params.set('sort_by', 'title.desc');
    }
    if (sortBy == 'release_date.asc') {
      params = params.set('sort_by', 'primary_release_date.asc');
    }
    if (sortBy == 'release_date.desc') {
      params = params.set('sort_by', 'primary_release_date.desc');
    }
    return this.http
      .get<MovieRespone>(this.apiUrl + `discover/movie`, {
        params,
      })

      .pipe(
        catchError((err) => {
          return throwError(() => {
            console.log(err);
          });
        })
      );
  }
  getTrendingMovies(time: 'day' | 'week') {
    return this.http
      .get<TrendingResponse>(this.apiUrl + `trending/movie/${time}`)
      .pipe(
        catchError((err) => {
          return throwError(() => {
            console.log(err);
          });
        })
      );
  }
  getMoviesDetails(movieId: number) {
    return this.http.get<MovieDetails>(this.apiUrl + `movie/${movieId}`).pipe(
      catchError((err) => {
        return throwError(() => {
          console.log(err);
        });
      })
    );
  }
}
