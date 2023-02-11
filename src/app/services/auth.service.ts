import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User
} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {addDoc, collection, doc, Firestore, serverTimestamp, setDoc} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: User | null | undefined;

  constructor(
    public auth: Auth,
    private router: Router,
    private db: Firestore,
  ) {
    onAuthStateChanged(this.auth, user => {
      this.currentUser = user;
    });
  }

  signInWithEmailAndPassword(credentials: any) {
    signInWithEmailAndPassword(this.auth, credentials.email, credentials.password)
      .then(() => {
      this.router.navigateByUrl('/dashboard');
    });
  }

  signUp(credentials: any) {
    createUserWithEmailAndPassword(this.auth, credentials.email, credentials.password)
      .then(async (user: any) => {
        const userDoc = doc(this.db, `users/${user.uid}`);
        await setDoc(userDoc, {
          name: credentials.name,
          email: credentials.email,
          created: serverTimestamp()
        });
        this.router.navigateByUrl('/dashboard');
      });
  }



}
