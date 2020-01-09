import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Injectable} from "@angular/core";
import {AuthService} from "../../services/AuthService";
import * as fromCore from '../actions';
import {catchError, map, switchMap, tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {from, of} from "rxjs";

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
        switchMap((value) => {
            console.log("En el Efecto!!!! ", value);
            return this.authService.login(value.credentials).pipe(
              map(value1 => (fromCore.loginSuccess({principal: value1}))),
              catchError((err, caught) =>
                of(fromCore.loginFailure({error: err})))
            )
          }
        )
      )
  );

  loginRequest$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(fromCore.loginRequest),
        tap( () => {
          console.log("Procesando ......")
          this.router.navigate(['login']);
        })
      ),
    {dispatch: false}
  );


}
