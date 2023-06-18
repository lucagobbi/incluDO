import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {TranslateService} from "@ngx-translate/core";
import {Language} from "../../models/Language";
import languageSupported from "../../../assets/i18n/langSupported.json";
import {ActionSheetButton, ActionSheetController} from "@ionic/angular";
import {fadeInRegular} from "../../animations/animations";

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

  constructor(
    private translateService: TranslateService,
    private authService: AuthService,
    private actionSheetController: ActionSheetController
  ) {
    this.translateService.use("it");
  }

  ngOnInit(): void {}

  async toggleChangeLang() {
    const sheet = await this.actionSheetController.create({
      buttons: this.getLangButtons(),
    });
    await sheet.present();
    const { data } = await sheet.onDidDismiss();
    if (data) {
      this.changeSiteLanguage(data.lang);
    }
  }

  getLangButtons() {
    const langButtons = new Array<ActionSheetButton>();
    this.languageList.forEach(lang => {
      langButtons.push({
        text: lang.label,
        data: {
          lang: lang.code
        }
      })
    });
    return langButtons;
  }

  changeSiteLanguage(localeCode: string): void {
    const selectedLanguage = this.languageList.find(
      (language) => language.code === localeCode
    );
    if(selectedLanguage) {
      this.selectedLanguage = selectedLanguage;
      this.translateService.use(localeCode);
    }
  }

  signOut() {
    this.authService.signOut();
  }

}
