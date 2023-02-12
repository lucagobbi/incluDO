import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NavController, ToastController} from "@ionic/angular";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OfferService} from "../../../services/offer.service";
import {IOffer} from "../../../models/IOffer";

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.page.html',
  styleUrls: ['./create-offer.page.scss'],
})
export class CreateOfferPage implements OnInit {

  form!: FormGroup;
  type: string | null | undefined;
  skills: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private navController: NavController,
    private formBuilder: FormBuilder,
    private offerService: OfferService,
    private router: Router,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.type = this.route.snapshot.paramMap.get('type');
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      skill: [''],
      skills: [null, [Validators.required]],
    });
  }

  back() {
    this.navController.back();
  }

  addSkill() {
    this.skills.push(this.form.get('skill')?.value);
    this.form.get('skill')?.reset();
  }

  removeSkill(index: number) {
    this.skills.splice(index, 1);
  }

  create() {
    const offer: IOffer = {
      title: this.form.get('title')?.value,
      description: this.form.get('description')?.value,
      skills: this.skills
    };
    this.offerService.createOffer(offer).then(async () => {
      const toast = await this.toastController.create({
        message: 'Offerta creata con successo!',
        color: 'success',
        duration: 2000
      });
      await toast.present();
      this.router.navigateByUrl('offers');
    });
  }

}
