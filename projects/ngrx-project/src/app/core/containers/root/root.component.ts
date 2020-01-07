import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import * as fromCore from '../../store/reducers'
import {select, Store} from "@ngrx/store";
import {CoreState, layoutFeature} from "../../store/reducers";
import {toggleSidenav} from "../../store/actions/layout.actions";

@Component({
  selector: 's-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {

  value$: Observable<string>;

  constructor(private store: Store<CoreState>) { }

  ngOnInit() {
    this.value$ = this.store.pipe(select(fromCore.getTitle));
  }

  changeState() {
    this.store.dispatch(toggleSidenav());
  }
}
