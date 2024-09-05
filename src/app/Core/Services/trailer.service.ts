import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Trailer } from '../Models/trailer';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrailerService {
  private apiUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getMovieTrailer(movieId: number) {
    return this.http
      .get<Trailer>(this.apiUrl + `movie/${movieId}/videos`)
      .pipe(
        map((videos: Trailer) =>
          videos.results
            .filter((video) => video.type === 'Trailer')
            .map((video) => video.key)
        ),
        catchError((err) => {
          return throwError(() => {
            console.log(err);
          });
        })
      );
  }
}
