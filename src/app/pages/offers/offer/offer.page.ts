import { Component, OnInit } from '@angular/core';
import {ModalController, NavController} from "@ionic/angular";
import {IOffer} from "../../../models/IOffer";
import {ActivatedRoute} from "@angular/router";
import {ApplyModalComponent} from "./apply-modal/apply-modal.component";

@Component({
  selector: 'app-offer',
  templateUrl: './offer.page.html',
  styleUrls: ['./offer.page.scss'],
})
export class OfferPage implements OnInit {

  offer!: IOffer;

  constructor(
    private route: ActivatedRoute,
    private navController: NavController,
    private modalController: ModalController,

  ) { }

  ngOnInit() {
    this.offer = this.route.snapshot.data['offer'];
  }

  back() {
    this.navController.back();
  }

  async apply() {
    const modal = await this.modalController.create({
      component: ApplyModalComponent,
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
  }

}
