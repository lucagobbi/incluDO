import { Injectable } from '@angular/core';
import {
  collection,
  Firestore,
  query,
  where,
  getCountFromServer,
  doc,
  docData,
  addDoc,
} from "@angular/fire/firestore";
import {AuthService} from "../auth/auth.service";
import {Offer} from "../../models/Offer";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(
    private db: Firestore,
    private authService: AuthService
  ) { }

  async countOffers() {
    const offersRef = collection(this.db, "offers");
    const q = query(offersRef, where("author", "==", this.authService.currentUser?.uid));
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  }

  createOffer(offer: Offer) {
    const offersRef = collection(this.db, 'offers');
    return addDoc(offersRef, {
      author: this.authService.currentUser?.uid,
      ...offer
    });
  }

  getOfferById(offerId: string | null): Observable<Offer> {
    const offerRef = doc(this.db, `offers/${offerId}`);
    return <Observable<Offer>>docData(offerRef, {idField: 'id'});
  }

  apply(offerId: string, application: any) {
    // const offerRef = doc(this.db, `offers/${offerId}`);
    // return this.storageService.uploadDoc(application.cv, <string>this.authService.currentUser?.uid)
    //   .then(ref => {
    //     return updateDoc(offerRef, {
    //       applications: arrayUnion({...application, cv: ref.ref.fullPath, userId: this.authService.currentUser?.uid})
    //     });
    //   });
  }
}
