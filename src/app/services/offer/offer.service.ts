import { Injectable } from '@angular/core';
import {addDoc, collection, collectionData, doc, docData, Firestore} from "@angular/fire/firestore";
import {IOffer} from "../../models/IOffer";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private db: Firestore) { }

  createOffer(offer: IOffer) {
    const offersRef = collection(this.db, 'offers');
    return addDoc(offersRef, {
      ...offer
    });
  }

  getOffers(): Observable<IOffer[]> {
    const offersRef = collection(this.db, 'offers');
    // @ts-ignore
    return collectionData(offersRef, {idField: 'id'});
  }

  getOfferById(offerId: string | null): Observable<IOffer> {
    const offerRef = doc(this.db, `offers/${offerId}`);
    // @ts-ignore
    return docData(offerRef, {idField: 'id'});
  }

}
