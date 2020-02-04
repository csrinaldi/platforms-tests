export enum CredentialType {
  EmailAndPassword
}

export interface Credentials{

  getCredentialType(): CredentialType;

}
