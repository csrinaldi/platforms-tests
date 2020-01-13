import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Injectable} from "@angular/core";
import {map, switchMap} from "rxjs/operators";

import {deleteAccountRequest} from "../actions/accounts.actions";
import {AccountService} from "../../services/accounts.service";
import {Store} from "@ngrx/store";
import {CoreState} from "../index";
import {of} from "rxjs";

import * as fromCore from '../index'
import {User} from "../../domain/user";

@Injectable()
export class AccountsEffects {

  constructor(
    private actions$: Actions,
    private accountService: AccountService,
    private store$: Store<CoreState>) {
  }

  accountDelete$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(deleteAccountRequest),
        switchMap( (action) => {
          console.log("HOLA COMO ANDAS");
          of<User[]>().pipe(
            map( () => fromCore.deleteAccountSuccess({accounts: []}))
          )
        })
      )
  );
}
