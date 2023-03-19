import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {LoadingController, NavController} from "@ionic/angular";
import {IOffer} from "../../../../models/IOffer";
import {FormBuilder, FormGroup} from "@angular/forms";
import {OfferService} from "../../../../services/offer/offer.service";
import {AuthService} from "../../../../services/auth/auth.service";
import {ToastService, ToastType} from "../../../../services/toast/toast.service";

@Component({
  selector: 'app-apply',
  templateUrl: './apply.page.html',
  styleUrls: ['./apply.page.scss'],
})
export class ApplyPage implements OnInit {

  offer!: IOffer;
  form!: FormGroup;
  docName!: string;

  constructor(
    private route: ActivatedRoute,
    private navController: NavController,
    private formBuilder: FormBuilder,
    private offerService: OfferService,
    private authService: AuthService,
    private loadingController: LoadingController,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.offer = this.route.snapshot.data['offer'];
    this.form = this.formBuilder.group({
      fullName: [this.authService.currentUser?.displayName],
      email: [this.authService.currentUser?.email],
      cv: [null],
    });
  }

  back() {
    this.navController.back();
  }

  uploadDoc() {
    document.getElementById('input-cv')?.click();
  }

  uploadedDoc(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.docName = file.name;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.get('cv')?.markAsDirty();
        this.form.get('cv')?.patchValue(reader.result);
      };
    }
  }

  async apply() {
    const loading = await this.loadingController.create();
    await loading.present();
    this.offerService.apply(<string>this.offer.id, {...this.form.getRawValue()})
      .then(() => {
        this.toastService.showToast('Candidatura inviata correttamente!', ToastType.success);
      })
      .catch(() => {
        this.toastService.showToast('Errore durante l\'invio della candidatura', ToastType.danger);
      })
      .finally(() => {
        loading.dismiss();
        this.navController.navigateForward(`/offers`);
      });
  }
}
