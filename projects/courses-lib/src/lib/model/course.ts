export class Course {


  constructor(id: number, name: string, description: string) {
    this._name = name;
    this._description = description;
    this._id = id;
  }

// tslint:disable-next-line:variable-firstName
  private _name: string;

  // tslint:disable-next-line:variable-firstName
  private _description: string;

  private _id: number;

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

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
