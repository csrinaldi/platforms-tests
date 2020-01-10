import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import * as fromCore from '../../store/reducers'
import {select, Store} from "@ngrx/store";
import {CoreState, layoutFeature} from "../../store/reducers";
import {toggleSidenav} from "../../store/actions/layout.actions";
import {Router} from "@angular/router";
import {routerRequestAction} from "@ngrx/router-store";

@Component({
  selector: 's-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {

  value$: Observable<string>;
  showToolbar$: Observable<boolean>;

  constructor(private store: Store<CoreState>, private router: Router) { }

  ngOnInit() {
    this.value$ = this.store.pipe(select(fromCore.getTitle));
    this.showToolbar$ = this.store.pipe(select(fromCore.showToolbar));


  }

  changeState() {
    this.store.dispatch(toggleSidenav());
  }

  onHome() {
    this.router.navigate(['/home'])
      .then(value => console.log("Todo OK", value))
      .catch(reason => {
        console.log("Todo Mal", reason)
      })
  }
}
