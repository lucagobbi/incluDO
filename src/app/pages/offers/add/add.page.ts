import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NavController} from "@ionic/angular";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastService, ToastType} from "../../../services/toast/toast.service";
import {OfferService} from "../../../services/offer/offer.service";
import {Offer} from "../../../models/Offer";
import {fadeInRegular, zoomInFast, zoomInRegular} from "../../../animations/animations";

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
  animations: [
    zoomInFast,
    zoomInRegular,
    fadeInRegular,
  ]
})
export class AddPage implements OnInit {

  currentStep: number = 1;
  form!: FormGroup;
  type: string | null | undefined;
  skills: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private navController: NavController,
    private formBuilder: FormBuilder,
    private offerService: OfferService,
    private router: Router,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.type = this.route.snapshot.paramMap.get('type');
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      skill: [''],
      skills: [null],
      companyName: ['', Validators.required],
      companyAddress: ['', Validators.required],
      companyPhone: ['', Validators.required],
      companyEmail: ['', Validators.required, Validators.email],
    });
  }

  nextStep() {
    this.currentStep++;
  }

  previousStep() {
    this.currentStep--;
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
    const offer: Offer = {
      title: this.form.get('title')?.value,
      description: this.form.get('description')?.value,
      skills: this.skills.map(s => s.skill),
      company: {
        name: this.form.get('companyName')?.value,
        address: this.form.get('companyAddress')?.value,
        phone: this.form.get('companyPhone')?.value,
        email: this.form.get('companyEmail')?.value,
      }
    };
    this.offerService.createOffer(offer).then(async () => {
      this.toastService.showToast('Offerta creata con successo!', ToastType.success)
      this.router.navigateByUrl('offers');
    }).catch((err: any) => {
      console.log(err);
      this.toastService.defaultError();
    });
  }

}
