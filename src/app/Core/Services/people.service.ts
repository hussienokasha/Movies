import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { catchError, map, throwError } from 'rxjs';
import { Person } from '../Models/person';
import { People } from '../Models/people';
import { PersonSocial } from '../Models/person-social';
import { PersonCombined } from '../Models/person-combined';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  private apiUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getPeople(page: number) {
    let pageParam = new HttpParams().set('page', page);
    return this.http
      .get<People>(`${this.apiUrl}/person/popular`, { params: pageParam })
      .pipe(
        catchError((err) => {
          return throwError(() => {
            console.log(err);
          });
        })
      );
  }
  getPersonDetails(personId: number) {
    return this.http.get<Person>(`${this.apiUrl}/person/${personId}`).pipe(
      catchError((err) => {
        return throwError(() => {
          console.log(err);
        });
      })
    );
  }
  getPersonSocial(personId: number) {
    return this.http
      .get<PersonSocial>(`${this.apiUrl}/person/${personId}/external_ids`)
      .pipe(
        catchError((err) => {
          return throwError(() => {
            console.log(err);
          });
        })
      );
  }
  getPersonCombined(personId: number) {
    return this.http
      .get<{ cast: PersonCombined[] }>(
        `${this.apiUrl}/person/${personId}/combined_credits`
      )
      .pipe(
        map((v) => v.cast),
        catchError((err) => {
          return throwError(() => {
            console.log(err);
          });
        })
      );
  }
}
