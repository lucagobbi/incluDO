export class Item {
  private _dateOfStart: string;
  private _dateOfEnd: string;
  private _location: string;
  private _description: string;


  constructor(dateOfStart: string, dateOfEnd: string, location: string, description: string) {
    this._dateOfStart = dateOfStart;
    this._dateOfEnd = dateOfEnd;
    this._location = location;
    this._description = description;
  }


  get dateOfStart(): string {
    return this._dateOfStart;
  }

  set dateOfStart(value: string) {
    this._dateOfStart = value;
  }

  get dateOfEnd(): string {
    return this._dateOfEnd;
  }

  set dateOfEnd(value: string) {
    this._dateOfEnd = value;
  }

  get location(): string {
    return this._location;
  }

  set location(value: string) {
    this._location = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }
}
