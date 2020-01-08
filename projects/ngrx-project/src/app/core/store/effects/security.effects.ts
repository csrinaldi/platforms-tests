import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Injectable} from "@angular/core";
import {AuthService} from "../../services/AuthService";
import * as fromCore from '../actions';
import {map, switchMap, tap} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable()
export class SecurityEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  login$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(fromCore.login),
        switchMap((value) =>
          this.authService.login(value.credentials).pipe(
            map(value1 => ( fromCore.loginSuccess({principal: value1}))),
          )
        )
      )
  );

  loginRequest$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(fromCore.loginRequest),
        tap( () => {
          this.router.navigate(['login']);
        })
      )
  );


}
