import { Injectable } from '@angular/core';
import {
  addDoc, arrayUnion,
  collection,
  collectionData,
  doc,
  docData,
  Firestore,
  onSnapshot,
  updateDoc,
  getCountFromServer, query, where
} from "@angular/fire/firestore";
import {IOffer} from "../../models/IOffer";
import {Observable} from "rxjs";
import {LocalNotifications} from "@capacitor/local-notifications";
import {IApplication} from "../../models/IApplication";
import {StorageService} from "../storage/storage.service";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(
    private db: Firestore,
    private storageService: StorageService,
    private authService: AuthService
  ) { }

  async countOffers() {
    const offersRef = collection(this.db, "offers");
    const q = query(offersRef, where("author", "==", this.authService.currentUser?.uid));
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  }

  createOffer(offer: IOffer) {
    const offersRef = collection(this.db, 'offers');
    return addDoc(offersRef, {
      author: this.authService.currentUser?.uid,
      ...offer
    });
  }

  getOffers(): Observable<IOffer[]> {
    const offersRef = collection(this.db, 'offers');
    onSnapshot(offersRef, (snapshot) => {
      snapshot.docChanges().forEach((change)=> {
        if (change.type === 'added') {
          console.log('Offer added');
          LocalNotifications.schedule({
            notifications: [
              {
                title: 'New offer added',
                body: 'Offer added',
                id: 1,
                schedule: { at: new Date(Date.now()) },
                sound: 'default',
                smallIcon: 'assets/icon/favicon.png',
                actionTypeId: '',
                extra: null
              }
            ]
          })
        }
      })
    })
    return <Observable<IOffer[]>>collectionData(offersRef, {idField: 'id'});
  }

  getOfferById(offerId: string | null): Observable<IOffer> {
    const offerRef = doc(this.db, `offers/${offerId}`);
    return <Observable<IOffer>>docData(offerRef, {idField: 'id'});
  }

  apply(offerId: string, application: IApplication) {
    const offerRef = doc(this.db, `offers/${offerId}`);
    return this.storageService.uploadDoc(application.cv, <string>this.authService.currentUser?.uid)
      .then(ref => {
        return updateDoc(offerRef, {
          applications: arrayUnion({...application, cv: ref.ref.fullPath, userId: this.authService.currentUser?.uid})
        });
      });
  }

}
