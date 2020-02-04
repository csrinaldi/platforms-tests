import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Principal} from '../domain/principal';
import {Observable, of} from 'rxjs';
import {Credentials} from '../domain/credentials';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(credentials: Credentials): Observable<Principal> {
    return this.http.post('/api/login', credentials, {observe: 'response'}).pipe(
      map((value: HttpResponse<Principal>) => value.body)
    );
  }

  logout(): Observable<boolean> {
    return this.http.post('/api/logout', {}, {observe: 'response'}).pipe(
      map((value: HttpResponse<{}>) => true),
      catchError((err => {
        return of(err);
      }))
    );
  }
}
