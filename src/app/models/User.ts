export class User {
  private _name:string;
  private _surname:string;
  private _dateOfBirth:string;
  private _email:string;
  private _phoneNumber:string;
  private _address:string;

  constructor(name: string, surname: string, dateOfBirth: string, email: string, phoneNumber: string, address: string) {
    this._name = name;
    this._surname = surname;
    this._dateOfBirth = dateOfBirth;
    this._email = email;
    this._phoneNumber = phoneNumber;
    this._address = address;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get surname(): string {
    return this._surname;
  }

  set surname(value: string) {
    this._surname = value;
  }

  get dateOfBirth(): string {
    return this._dateOfBirth;
  }

  set dateOfBirth(value: string) {
    this._dateOfBirth = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get phoneNumber(): string {
    return this._phoneNumber;
  }

  set phoneNumber(value: string) {
    this._phoneNumber = value;
  }

  get address(): string {
    return this._address;
  }

  set address(value: string) {
    this._address = value;
  }
}
