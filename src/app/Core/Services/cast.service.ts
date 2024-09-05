import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Cast } from '../Models/cast';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CastService {
  private apiUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getMediaCasts(mediaType: 'tv' | 'movie', mediaId: number) {
    return this.http
      .get<{cast:Cast[]}>(this.apiUrl + `${mediaType}/${mediaId}/credits`)
      .pipe(
        map((val) => val.cast),
        catchError((err) => {
          return throwError(() => {
            console.log(err);
          });
        })
      );
  }
}
