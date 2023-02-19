import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NavController} from "@ionic/angular";
import {IOffer} from "../../../../models/IOffer";
import {FormBuilder, FormGroup} from "@angular/forms";
import {OfferService} from "../../../../services/offer/offer.service";
import {AuthService} from "../../../../services/auth/auth.service";

@Component({
  selector: 'app-apply',
  templateUrl: './apply.page.html',
  styleUrls: ['./apply.page.scss'],
})
export class ApplyPage implements OnInit {

  offer!: IOffer;
  form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private navController: NavController,
    private formBuilder: FormBuilder,
    private offerService: OfferService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.offer = this.route.snapshot.data['offer'];
    this.form = this.formBuilder.group({
      fullName: [this.authService.currentUser?.displayName],
      email: [this.authService.currentUser?.email],
      cv: [''],
    });
  }

  back() {
    this.navController.back();
  }

  apply() {

  }
}
