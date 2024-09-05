import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Recommendation } from '../Models/recommendation';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecommendationService {
  constructor(private http: HttpClient) {}
  private apiUrl: string = environment.baseUrl;
  getRecommendation(mediaType: 'tv' | 'movie', mediaId: number) {
    return this.http
      .get<{ results: Recommendation[] }>(
        this.apiUrl + `${mediaType}/${mediaId}/recommendations`
      )
      .pipe(
        map((res) => res.results),
        catchError((err) => {
          return throwError(() => {
            console.log(err);
          });
        })
      );
  }
}
