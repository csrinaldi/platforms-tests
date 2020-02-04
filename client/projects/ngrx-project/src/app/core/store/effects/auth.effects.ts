import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {AuthService} from '../../services/AuthService';
import * as fromCore from '../actions';
import {catchError, map, mapTo, switchMap, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {of} from 'rxjs';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {
  }

  loginRequest$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(fromCore.loginRequest),
        switchMap((value) => {
            console.log('En el Efecto!!!! ', value);
            return this.authService.login(value.credentials).pipe(
              map(value1 => (fromCore.loginSuccess({principal: value1}))),
              catchError((err, caught) =>
                of(fromCore.loginFailure({error: err})))
            );
          }
        )
      )
  );

  logoutRequest$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(fromCore.logoutRequest),
        switchMap((value) => {
            return this.authService.logout().pipe(
              map(value1 => (fromCore.logoutSuccess())),
              catchError((err, caught) =>
                of(fromCore.logoutFailure({error: err})))
            );
          }
        )
      )
  );

  logoutSuccess$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(fromCore.logoutSuccess),
        mapTo(fromCore.loginViewRequest())
      )
  );

  loginViewRequest$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(fromCore.loginViewRequest),
        tap(() => {
          console.log('Procesando ......');
          this.router.navigate(['login']);
        })
      ),
    {dispatch: false}
  );


}
