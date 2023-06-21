import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {

  constructor(
    public authService: AuthService,
    private navController: NavController,
  ) { }

  ngOnInit() {
  }

  addOffer() {
    this.navController.navigateForward('/add');
  }

}
