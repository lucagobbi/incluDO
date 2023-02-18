import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {ActionSheetController} from "@ionic/angular";
import {Router} from "@angular/router";
import {OfferService} from "../../services/offer/offer.service";
import {Observable} from "rxjs";
import {IOffer} from "../../models/IOffer";

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {

  offers!: Observable<IOffer[]>;

  constructor(
    public authService: AuthService,
    private router: Router,
    private actionSheetController: ActionSheetController,
    private offerService: OfferService
  ) { }

  ngOnInit() {
    this.offers = this.offerService.getOffers();
  }

  async add() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [
        {
          text: 'Offerta di lavoro',
          data: {
            type: 'job-offer'
          }
        },
        {
          text: 'Annuncio generico',
          data: {
            type: 'post'
          }
        },
        {
          text: 'Iniziativa comunale',
          data: {
            type: 'initiative'
          }
        },
      ],
    });
    await actionSheet.present();
    const { data } = await actionSheet.onDidDismiss();
    if(data?.type) {
      this.router.navigate(['/create-offer', data.type]);
    }
  }

  goToDetails(offerId: string | undefined) {
    this.router.navigateByUrl(`/offer/${offerId}`);
  }

}
