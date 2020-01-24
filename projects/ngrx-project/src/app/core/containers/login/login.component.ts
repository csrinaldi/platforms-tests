import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {select, Store} from "@ngrx/store";
import * as fromCode from '../../store'
import {EmailPasswordCredentials} from "../../domain/emailPasswordCredentials";
import {Observable} from "rxjs";
import {User} from "../../domain/user";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {isNotNullOrUndefined} from "codelyzer/util/isNotNullOrUndefined";

import * as fromCore from "../../store/reducers";

enum StepPass {
  SelectUsers = '0',
  UserName = '1',
  Password = '2'
}

@Component({
  selector: 's-home',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  errors$: Observable<Error>;
  hasErrors$: Observable<boolean>;
  loading$: Observable<boolean>;
  accounts$: Observable<User[]>;
  hasAccounts: boolean;

  StepPass = StepPass;

  step: StepPass = StepPass.SelectUsers;

  referred;

  localUserSelected: User;

  deleteAccount = false;

  @ViewChildren('password')
  public password: QueryList<ElementRef>;

  passwordElementRef: ElementRef = undefined;

  userForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email])
  });

  passwordForm = new FormGroup({
    password: new FormControl('', [Validators.required])
  });

  constructor(private router: Router,
              // private activatedRoute: ActivatedRoute,
              // private db: IndexedDBService,
              // private usersService: UsersServices,
              // private usersLocalDbService: UsersLocalDbServices,
              private store: Store<fromCode.CoreState>) {

  }

  ngOnInit() {
    this.errors$ = this.store.pipe(select(fromCore.errors));
    this.hasErrors$ = this.store.pipe(select(fromCore.hasErrors));
    this.loading$ = this.store.pipe(select(fromCore.loading));
    this.accounts$ = this.store.pipe(select(fromCore.accounts));

    this.accounts$.subscribe(value => {
      this.hasAccounts = ( value.length > 0);
    })
  }

  onLogin() {
    if (this.passwordForm.valid) {

      const username = isNotNullOrUndefined(this.localUserSelected) ? this.localUserSelected.username : this.userForm.get('username').value;
      const password = this.passwordForm.get('password').value;

      const credentials = new EmailPasswordCredentials();
      credentials.username = username;
      credentials.password = password;
      this.store.dispatch(fromCode.loginRequest({credentials}));
    }
  }

  toOtherAccount() {
    this.step = StepPass.UserName;
  }

  onBack() {
    if ( this.hasAccounts ) {
       this.step = StepPass.SelectUsers;
     } else {
      this.step = StepPass.UserName;
    }
  }

  onDeleteAccount() {
    this.deleteAccount = !this.deleteAccount;
  }

  async onDeleteAccountFromList(user) {
    this.store.dispatch(fromCode.deleteAccountRequest({account: user}));

    // const vm = this;
    // await vm.usersLocalDbService.removeUser(user);
    // vm.router.navigate(['/users/login'])
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }

  toPassword() {
    if (this.userForm.valid) {
      this.step = StepPass.Password;
    }
  }

  ngAfterViewInit(): void {
    this.password.changes.subscribe((c: QueryList<ElementRef>) => {
      this.passwordElementRef = c.first;
    });
  }

  animationDone($event: any) {
    if ( !isNotNullOrUndefined(this.passwordElementRef)) {
      // this.passwordElementRef['nativeElement'].focus();
    }
  }

  getUserNameErrorMessage() {
    const control = this.userForm.get('username');

    return control.hasError('required') ? 'Debe ingresar un nombre de usuario' :
      control.hasError('email') ? 'El nombre de usuario no es valido' :
        '';
  }

  getPasswordErrorMessage() {
    const control = this.passwordForm.get('password');
    return control.hasError('required') ? 'Debe ingresar la contraseña' : '';

  }

  onLocalUserSelected(user: User) {
      this.localUserSelected = user;
      console.log(this.localUserSelected);
      this.step = StepPass.Password;
  }

  /**
   * TODO change for ngrx
   */
  forgotPassword() {
    this.router.navigate(['users/forgot']);
  }

}
