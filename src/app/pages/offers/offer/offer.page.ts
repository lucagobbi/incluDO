import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";
import {IOffer} from "../../../models/IOffer";
import {ActivatedRoute} from "@angular/router";

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
  ) { }

  ngOnInit() {
    this.offer = this.route.snapshot.data['offer'];
  }

  back() {
    this.navController.back();
  }

}
