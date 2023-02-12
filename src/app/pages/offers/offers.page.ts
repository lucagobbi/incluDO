import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ActionSheetController} from "@ionic/angular";

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {

  constructor(
    public authService: AuthService,
    private actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {
  }

  async add() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [
        {
          text: 'Offerta di lavoro',
        },
        {
          text: 'Annuncio generico',
        },
        {
          text: 'Iniziativa comunale',
        },
      ],
    });
    await actionSheet.present();
  }

}
