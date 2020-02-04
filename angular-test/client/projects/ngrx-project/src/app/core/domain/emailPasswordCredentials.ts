import {Credentials, CredentialType} from './credentials';

export class EmailPasswordCredentials implements Credentials {

  private _username: string;

  private _password: string;

  getCredentialType(): CredentialType {
    return CredentialType.EmailAndPassword;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }
}
