import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Injectable} from "@angular/core";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";
import {RouterNavigationAction, routerNavigationAction} from "@ngrx/router-store";

import * as fromCore from '../actions'

@Injectable()
export class LayoutEffects {

  constructor(
    private actions$: Actions,
    private router: Router
  ) {
  }

  locationUpdate$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(routerNavigationAction),
        map( (value: RouterNavigationAction) => {
          if ( value.payload.routerState['data'] !== undefined && value.payload.routerState['data']['fullscreen'] ){
            return fromCore.hideToolbar
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
