import { Injectable } from '@angular/core';
import {addDoc, collection, collectionData, Firestore} from "@angular/fire/firestore";
import {IOffer} from "../models/IOffer";

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

  getOffers() {
    const offersRef = collection(this.db, 'offers');
    return collectionData(offersRef);
  }

}
