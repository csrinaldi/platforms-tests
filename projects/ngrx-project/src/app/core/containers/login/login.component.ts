import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {select, Store} from "@ngrx/store";
import * as fromCode from '../../store'
import {EmailPasswordCredentials} from "../../domain/emailPasswordCredentials";
import {Observable} from "rxjs";
import * as fromCore from "../../store/reducers";
import {User} from "../../domain/user";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {isNotNullOrUndefined} from "codelyzer/util/isNotNullOrUndefined";

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

  StepPass = StepPass;

  step: StepPass = StepPass.SelectUsers;

  localUsers: User[];

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

    /*const vm = this;
    vm.activatedRoute.queryParams.subscribe((value => {
      if (!isNullOrUndefined(value)) {
        const finded = Object.keys(value).find((v, index, objects) => {
          return (v === 'ref');
        });

        if (finded) {
          vm.referred = value['ref'];
        } else {
          vm.referred = '/home';
        }
      }

    }));

    vm.activatedRoute.data.subscribe(data => {
      vm.localUsers = data['localUsers'];
      if (isNullOrUndefined(vm.localUsers) || vm.localUsers.length === 0) {
        vm.step = StepPass.UserName;
      }
    });*/
  }

  onLogin() {
    if (this.passwordForm.valid) {
      const username = isNotNullOrUndefined(this.localUserSelected) ? this.userForm.get('username').value : this.localUserSelected['username'];
      const passwd = this.passwordForm.get('password').value;

      const credentials = new EmailPasswordCredentials();
      credentials.username = username;
      credentials.password = passwd;
      this.store.dispatch(fromCode.loginRequest({credentials}))
    }
  }

  toOtherAccount() {
    this.step = StepPass.UserName;
  }

  onBack() {
    // if ( !isNotNullOrUndefined(this.localUsers) && this.localUsers.length > 0 ) {
    //   this.step = StepPass.SelectUsers;
    // } else {
      this.step = StepPass.UserName;
    // }
  }

  onDeleteAccount() {
    this.deleteAccount = !this.deleteAccount;
  }

  async onDeleteAccountFronList(user) {
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
    if ( !this.deleteAccount ) {
      this.localUserSelected = user;
      this.step = StepPass.Password;
    }
  }

  /**
   * TODO change for ngrx
   */
  forgotPassword() {
    this.router.navigate(['users/forgot']);
  }

}
