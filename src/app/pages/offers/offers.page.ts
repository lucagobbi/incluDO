import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {ActionSheetController, GestureController, GestureDetail} from "@ionic/angular";
import {Router} from "@angular/router";
import {OfferService} from "../../services/offer/offer.service";
import {Observable} from "rxjs";
import {IOffer} from "../../models/IOffer";

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, AfterViewInit {

  offers!: Observable<IOffer[]>;

  constructor(
    public authService: AuthService,
    private router: Router,
    private actionSheetController: ActionSheetController,
    private offerService: OfferService,
    private gestureController: GestureController
  ) { }

  ngOnInit() {
    this.offers = this.offerService.getOffers();
  }

  ngAfterViewInit() {
    const gesture = this.gestureController.create({
      gestureName: 'create-offer',
      el: <HTMLElement>document.getElementById('offers'),
      threshold: 0,
      onEnd: (detail: GestureDetail) => {
        if (detail.deltaY < -100 && detail.velocityY < -0.15) {
          this.add();
        }
      }
    });
    gesture.enable();
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
