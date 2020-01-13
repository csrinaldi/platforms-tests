/**
 * Guards are hooks into the route resolution process, providing an opportunity
 * to inform the router's navigation process whether the route should continue
 * to activate this route. Guards must return an observable of true or false.
 */
import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";

import * as fromCore from '../store'
import {select, Store} from "@ngrx/store";
import {AuthService} from "./AuthService";
import {Observable, of} from "rxjs";
import {filter, map, mergeMap, switchMap, take, withLatestFrom} from "rxjs/operators";
import {Principal} from "../domain/principal";
import {User} from "../domain/user";
import {analyseSourcesTransform} from "ng-packagr/lib/ng-v5/init/analyse-sources.transform";

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(
    private store: Store<fromCore.AuthState>) {
  }

  deleteAccount(account: User): Observable<User[]> {
      console.log(account);
      return of().pipe(
        withLatestFrom(this.store.pipe(select(fromCore.accounts))),
        switchMap((value) => {
          console.log("asas", value);
          return of([])
        })
      )
  }

}
