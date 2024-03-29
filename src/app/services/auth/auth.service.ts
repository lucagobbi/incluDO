import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  User, signInWithPopup, signOut, updateProfile
} from "@angular/fire/auth";
import { Router } from "@angular/router";
import { Firestore } from "@angular/fire/firestore";
import { LoadingController, ToastController } from "@ionic/angular";
import { from, switchMap } from "rxjs";
import { getDownloadURL, ref, Storage, uploadBytes } from "@angular/fire/storage";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: User | null | undefined;

  isAdmin: boolean = false;

  constructor(
    public auth: Auth,
    private router: Router,
    private db: Firestore,
    private storage: Storage,
    private loadingController: LoadingController,
    private toastController: ToastController

  ) {
    onAuthStateChanged(this.auth, user => {
      this.currentUser = user;
      user?.getIdTokenResult().then(value => {
        this.isAdmin = value.claims['admin'] == true ? true : false;
      })
    });
  }

  async signInWithEmailAndPassword(credentials: any) {
    const loading = await this.loadingController.create({
      spinner: 'lines-sharp',
    });
    await loading.present();
    signInWithEmailAndPassword(this.auth, credentials.email, credentials.password)
      .then(() => {
        loading.dismiss();
        this.router.navigateByUrl('/home');
      })
      .catch(async () => {
        await loading.dismiss();
        const toast = await this.toastController.create({
          message: 'Email o password non corrette',
          icon: 'warning-outline',
          duration: 2000,
          animated: true,
          color: 'danger'
        });
        await toast.present();
      });
  }

  signUp(credentials: any) {
    createUserWithEmailAndPassword(this.auth, credentials.email, credentials.password)
      .then(() => {
        this.router.navigateByUrl('/home');
      });
  }

  signInWithGoogle() {
    signInWithPopup(this.auth, new GoogleAuthProvider())
      .then(() => {
        this.router.navigateByUrl('/home');
      })
  }

  signOut() {
    signOut(this.auth)
      .then(() => this.router.navigateByUrl('login'));
  }

  uploadImage(image: File, path: string) {
    const storageRef = ref(this.storage, path);
    const uploadTask = from(uploadBytes(storageRef, image));
    return uploadTask.pipe(
      switchMap((result: any) => getDownloadURL(result.ref))
    );
  }

  updateProfile(file: File, userId: string | undefined) {
    this.uploadImage(file, `images/profile/${userId}`)
      .pipe(
        switchMap(async (photoURL) => {
          if (this.currentUser) {
            await updateProfile(this.currentUser, { photoURL })
          }
        })
      ).subscribe();
  }

}
