import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import {IOffer} from "../../models/IOffer";
import {OfferService} from "../offer/offer.service";

@Injectable({
  providedIn: 'root'
})
export class OfferResolver implements Resolve<IOffer> {

  constructor(private offerService: OfferService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IOffer> {
    return this.offerService.getOfferById(route.paramMap.get('id'));
  }

}
