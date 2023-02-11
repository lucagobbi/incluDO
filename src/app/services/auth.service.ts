import { Injectable } from '@angular/core';
import {Auth, onAuthStateChanged, User} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: User | null | undefined;

  ui: any;

  constructor(public auth: Auth) {
    onAuthStateChanged(this.auth, user => {
      this.currentUser = user;
    });
  }

}
