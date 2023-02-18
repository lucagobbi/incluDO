import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {Camera, CameraResultType, CameraSource} from "@capacitor/camera";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  imageURL!: string | null | undefined;
  imagePreviewed: boolean = false;

  constructor(public authService: AuthService) { }

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

}
