export class Course {

  // tslint:disable-next-line:variable-name
  private _name: string;

  // tslint:disable-next-line:variable-name
  private _description: string;

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }
}
