import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import * as fromCode from '../../store'
import {EmailPasswordCredentials} from "../../domain/emailPasswordCredentials";
import {Observable} from "rxjs";
import * as fromCore from "../../store/reducers";

@Component({
  selector: 's-home',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errors$: Observable<string>;
  hasErrors$: Observable<boolean>;

  constructor(private store: Store<fromCode.CoreState>) { }

  ngOnInit() {
    this.errors$ = this.store.pipe(select(fromCore.errors));
    this.hasErrors$ = this.store.pipe(select(fromCore.hasErrors));
  }

  onLogin() {
    const credentials = new EmailPasswordCredentials();
    credentials.username = 'csrinaldi';
    credentials.password = '123123123';
    this.store.dispatch(fromCode.login({credentials}))
  }
}
