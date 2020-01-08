import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import * as fromCore from '../../store/reducers'
import {select, Store} from "@ngrx/store";
import {CoreState, layoutFeature} from "../../store/reducers";
import {toggleSidenav} from "../../store/actions/layout.actions";
import {Principal} from "../../domain/principal";

@Component({
  selector: 's-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  principal$: Observable<Principal>;

  constructor(private store: Store<CoreState>) { }

  ngOnInit() {
    this.principal$ = this.store.pipe(select(fromCore.principal));
  }

}
