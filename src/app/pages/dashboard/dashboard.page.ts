import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {Camera, CameraResultType, CameraSource} from "@capacitor/camera";
import {TranslateService} from "@ngx-translate/core";
import {ILanguage} from "../../models/ILanguage";
import languageSupported from "../../../assets/i18n/languageSupported.json";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  imageURL!: string | null | undefined;
  imagePreviewed: boolean = false;

  languageList: ILanguage[] = languageSupported;
  selectedLanguage: ILanguage | undefined = this.languageList[1];

  constructor(
    public authService: AuthService,
    private translateService: TranslateService
  ) { }

  ngOnInit() {
    this.imageURL = this.authService.currentUser?.photoURL;
  }

  async updatePhoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      source: CameraSource.Photos,
      resultType: CameraResultType.Base64
    });

    this.imageURL = image.base64String;
    this.imagePreviewed = true;
  }

  updateProfile() {

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

}
