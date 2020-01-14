import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import * as fromCore from '../../core/store/reducers'
import {CoreState} from '../../core/store/reducers'
import {select, Store} from "@ngrx/store";
import {Principal} from "../../core/domain/principal";
import {Router} from "@angular/router";

@Component({
  selector: 's-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  principal$: Observable<Principal>;

  constructor(private store: Store<CoreState>, private router: Router) { }

  ngOnInit() {
    this.principal$ = this.store.pipe(select(fromCore.principal));
  }

  toCourses() {
    this.router.navigate(['courses']);
  }
}
