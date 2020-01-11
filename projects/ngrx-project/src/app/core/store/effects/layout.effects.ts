import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Injectable} from "@angular/core";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";
import {RouterNavigationAction, routerNavigationAction} from "@ngrx/router-store";

import * as fromCore from '../actions'
import {Store} from "@ngrx/store";
import {CoreState} from "../reducers";

@Injectable()
export class LayoutEffects {

  constructor(
    private actions$: Actions,
    private router: Router,
    private store: Store<CoreState>
  ) {
  }

  /**
   * Listening navigation change, and search parameter data in to router.
   * Update Layout, according of the data value....
   *
   */
  locationUpdate$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(routerNavigationAction),
        map( (value: RouterNavigationAction) => {
          return value.payload.routerState['root']['firstChild'];
        }),
        map(firstChild => {
          if ( firstChild['data'] !== undefined &&  firstChild['data']['toolbar'] != undefined &&  firstChild['data']['toolbar'] ){
            return fromCore.showToolbar();
          } else {
            return fromCore.hideToolbar();
          }
        })
      )
  );






  // locationUpdate$: Observable<Action> = this.actions$.ofType('ROUTER_NAVIGATION')
  //   .filter((n: any) => {
  //     return n.payload.event.url.indexOf('flight')
  //   })
  //   .switchMap((action: any) => {
  //     // extract params from url
  //     const rS = action.payload.routerState
  //     const searchParams = rS.root.firstChild.params
  //     // trigger FindAction with search params
  //     return Observable.of(new flight.FindAction(searchParams))
  //   });

}



// handle location update
