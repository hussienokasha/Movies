import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { TvResults } from '../Models/tv-results';
import { catchError, throwError } from 'rxjs';
import { TvDetails } from '../Models/tv-details';
export type tvType = 'on_the_air' | 'airing_today' | 'popular' | 'top_rated';
@Injectable({
  providedIn: 'root',
})
export class TvService {
  private apiUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) {}
  getTvDetails(tvId: number) {
    return this.http.get<TvDetails>(this.apiUrl + `tv/${tvId}`).pipe(
      catchError((err) => {
        return throwError(() => {
          console.log(err);
        });
      })
    );
  }

  getTvShows(type: tvType, page: number) {
    let pageParam = new HttpParams().set('page', page);
    return this.http
      .get<TvResults>(this.apiUrl + `tv/${type}`, { params: pageParam })
      .pipe(
        catchError((err) => {
          return throwError(() => {
            console.log(err);
          });
        })
      );
  }
}
