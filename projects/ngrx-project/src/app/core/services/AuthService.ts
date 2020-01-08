import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";

import * as fromCore from '../store/reducers'
import {Store} from "@ngrx/store";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Principal} from "../domain/principal";
import {Observable} from "rxjs";
import {Credentials} from "../domain/credentials";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class AuthService{

  constructor(private http: HttpClient) {}

  login(credentials: Credentials): Observable<Principal> {
    return this.http.post('/api/login', credentials, {observe: 'response'}).
      pipe(
        map( (value: HttpResponse<Principal>) => value.body )
    );
  }
}
