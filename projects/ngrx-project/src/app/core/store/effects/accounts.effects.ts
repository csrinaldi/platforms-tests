import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';

import {deleteAccountRequest} from '../actions/accounts.actions';
import {select, Store} from '@ngrx/store';
import * as fromCore from '../index';
import {from, of} from 'rxjs';
import {User} from '../../domain/user';

@Injectable()
export class AccountsEffects {

  constructor(
    private actions$: Actions,
    private store$: Store<fromCore.CoreState>) {}

  accountDelete$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(deleteAccountRequest),
        switchMap(value => {
          return of(null).pipe(
            withLatestFrom(this.store$.pipe(select(fromCore.accounts))),
            map(([action, accounts]) => {
              const filtered = accounts.filter((user: User) => {
                return user.username !== value.account.username;
              });
              return fromCore.deleteAccountSuccess({accounts: filtered});
            }));
        })
      )
  );

}
