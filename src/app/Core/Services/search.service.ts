import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { SearchResponse } from '../Models/search';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}
  private apiUrl: string = environment.baseUrl;
  search(query: string) {
    let searchParam = new HttpParams();
    searchParam =searchParam.set('include_adult', 'true').set('query', query);
    return this.http.get<SearchResponse>(this.apiUrl + 'search/multi',{params:searchParam}).pipe(
      catchError((err) => {
        return throwError(() => {
          console.log(err);
        });
      })
    );
  }
}
