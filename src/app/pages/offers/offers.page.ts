import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth/auth.service";
import { NavController } from "@ionic/angular";
import { OfferService } from 'src/app/services/offer/offer.service';
import { Observable } from 'rxjs';
import { Offer } from 'src/app/models/Offer';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {

  offers$!: Observable<Offer[]>;

  constructor(
    public authService: AuthService,
    private navController: NavController,
    private offerService: OfferService
  ) { }

  ngOnInit() {
    this.offers$ = this.offerService.getAll();
  }

  back() {
    this.navController.back();
  }

  addOffer() {
    this.navController.navigateForward('/offers/add');
  }

}
