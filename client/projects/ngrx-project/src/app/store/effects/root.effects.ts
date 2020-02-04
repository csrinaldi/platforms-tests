import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import * as fromCore from '../../core/store';

@Injectable()
export class RootEffects {

  constructor(
    private actions$: Actions,
    private router: Router) {
  }

  loginRequestSuccess = createEffect(
    () => this.actions$
      .pipe(
        ofType(fromCore.loginSuccess),
        tap(() => {
          console.log('Procesando ......');
          this.router.navigate(['home']);
        })
      ), {dispatch: false}
  );
}
