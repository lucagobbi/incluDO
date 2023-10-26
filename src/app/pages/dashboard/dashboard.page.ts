import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth/auth.service";
import { TranslateService } from "@ngx-translate/core";
import { Language } from "../../models/Language";
import languageSupported from "../../../assets/i18n/langSupported.json";
import { ActionSheetButton, ActionSheetController, NavController } from "@ionic/angular";
import { fadeInRegular } from "../../animations/animations";
import { OfferService } from 'src/app/services/offer/offer.service';
import { Offer } from 'src/app/models/Offer';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  animations: [
    fadeInRegular
  ]
})
export class DashboardPage implements OnInit {

  languageList: Language[] = languageSupported;
  selectedLanguage: Language | undefined = this.languageList[1];
  offers!: Offer[];
  currentIndex = 0;

  constructor(
    private offerService: OfferService
  ) {
  }

  ngOnInit(): void {
    this.offerService.getLatests().then(offers => {
      this.offers = offers;
    });
  }

  nextLatest() {
    if (this.currentIndex < this.offers.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }

  prevLatest() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.offers.length - 1;
    }
  }

}
