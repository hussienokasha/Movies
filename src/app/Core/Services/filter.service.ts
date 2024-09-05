import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { MovieRespone } from '../Models/movies-list';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  constructor(private http: HttpClient) {}
  private apiUrl: string = environment.baseUrl;

  getFilteredMovies(){
    return this.http.get<MovieRespone>(`${this.apiUrl}discover/movie?sort_by=popularity.desc`);
  }

}
