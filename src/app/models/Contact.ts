export class Contact {
  private _social: string;
  private _link: string;

  constructor(social: string, link: string) {
    this._social = social;
    this._link = link;
  }

  get social(): string {
    return this._social;
  }

  set social(value: string) {
    this._social = value;
  }

  get link(): string {
    return this._link;
  }

  set link(value: string) {
    this._link = value;
  }
}
