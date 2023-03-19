import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {Camera, CameraResultType, CameraSource} from "@capacitor/camera";
import {TranslateService} from "@ngx-translate/core";
import {ILanguage} from "../../models/ILanguage";
import languageSupported from "../../../assets/i18n/languageSupported.json";
import {ActionSheetButton, ActionSheetController} from "@ionic/angular";
import {decode} from "base64-arraybuffer";
import {OfferService} from "../../services/offer/offer.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage implements OnInit {

  imageURL!: string | null | undefined;
  imagePreviewed: boolean = false;

  languageList: ILanguage[] = languageSupported;
  selectedLanguage: ILanguage | undefined = this.languageList[1];

  constructor(
    public authService: AuthService,
    private translateService: TranslateService,
    private offerService: OfferService,
    private actionSheetController: ActionSheetController,
  ) { }

  ngOnInit() {
    this.imageURL = this.authService.currentUser?.photoURL;
  }

  async choosePhoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      source: CameraSource.Photos,
      resultType: CameraResultType.DataUrl,
    });
    this.imageURL = image.dataUrl;
    this.imagePreviewed = true;
    if(image.dataUrl) {
      const blob = this.dataURItoBlob(image.dataUrl);
      const file = new File([blob], 'img');
      this.authService.updateProfile(file, this.authService.currentUser?.uid);
    }
  }

  dataURItoBlob(dataURI: string) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {ia[i] = byteString.charCodeAt(i);}
    return new Blob([ab], {type: mimeString});
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

  async openLangSheet() {
    const actionSheet = await this.actionSheetController.create({
      buttons: this.generateLangButtons(),
    });
    await actionSheet.present();
    const { data } = await actionSheet.onDidDismiss();
    if(data?.code) {
      this.changeSiteLanguage(data?.code);
    }
  }

  generateLangButtons(): ActionSheetButton[] {
    return this.languageList.map(lang => {
     return {text: lang.label, data: lang};
    });
  }

  async countOffers() {
    await this.offerService.countOffers();
  }
}
