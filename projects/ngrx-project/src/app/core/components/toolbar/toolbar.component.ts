import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {CoreState} from "../../store/reducers";
import {select, Store} from "@ngrx/store";

import * as fromCore from '../../store';

@Component({
  selector: 's-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Input() title: string;
  @Input() logo$: Observable<string>;
  @Input() avatar$: Observable<string>;
  @Input() hasLogout$: Observable<boolean>;

  @Output() toggle = new EventEmitter();

  constructor(private store: Store<CoreState>) { }

  ngOnInit() {
    this.hasLogout$ = this.store.pipe(select(fromCore.loggedIn))
  }


  logout() {
    this.store.dispatch(fromCore.logoutRequest())
  }
}
