import {Item} from "./Item";

export class EducationItem extends Item {
  private _field: string;
  private _title: string;
  private _graduation: string;


  constructor(dateOfStart: string, dateOfEnd: string, location: string, description: string, field: string, title: string, graduation: string) {
    super(dateOfStart, dateOfEnd, location, description);
    this._field = field;
    this._title = title;
    this._graduation = graduation;
  }


  get field(): string {
    return this._field;
  }

  set field(value: string) {
    this._field = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get graduation(): string {
    return this._graduation;
  }

  set graduation(value: string) {
    this._graduation = value;
  }
}
