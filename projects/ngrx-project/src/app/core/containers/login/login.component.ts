import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromCode from '../../store'
import {EmailPasswordCredentials} from "../../domain/emailPasswordCredentials";

@Component({
  selector: 's-home',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private store: Store<fromCode.CoreState>) { }

  ngOnInit() {

  }

  onLogin() {
    const credentials = new EmailPasswordCredentials();
    credentials.username = 'csrinaldi';
    credentials.password = '123123123';
    this.store.dispatch(fromCode.login({credentials}))
  }
}
