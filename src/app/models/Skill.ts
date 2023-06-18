export class Skill {

  private _title: string;
  private _level: string;


  constructor(title: string, level: string) {
    this._title = title;
    this._level = level;
  }


  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get level(): string {
    return this._level;
  }

  set level(value: string) {
    this._level = value;
  }
}
