import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NavController, ToastController} from "@ionic/angular";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OfferService} from "../../../services/offer/offer.service";
import {IOffer} from "../../../models/IOffer";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.page.html',
  styleUrls: ['./create-offer.page.scss'],
  animations: [
    trigger('fadeRegular', [
      state('void', style({opacity: 0, transform: 'scale(0.25)'})),
      transition('void <=> *', [
        animate(125)
      ]),
    ]),
    trigger('fadeFast', [
      state('void', style({opacity: 0, transform: 'scale(0.25)'})),
      transition('void <=> *', [
        animate(70)
      ]),
    ]),
  ]
})
export class CreateOfferPage implements OnInit {

  form!: FormGroup;
  type: string | null | undefined;
  skills: any[] = [];

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
    this.skills.push({skill: this.form.get('skill')?.value, selected: false});
    this.form.get('skill')?.reset();
  }

  removeSkill(index: number) {
    this.skills.splice(index, 1);
  }

  toggle(index: number) {
    this.skills[index].selected = !this.skills[index].selected;
  }

  create() {
    const offer: IOffer = {
      title: this.form.get('title')?.value,
      description: this.form.get('description')?.value,
      skills: this.skills.map(s => s.skill)
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
