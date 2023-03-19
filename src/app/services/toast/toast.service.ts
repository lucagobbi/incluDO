import { Injectable } from '@angular/core';
import {ToastController} from "@ionic/angular";

export enum ToastType {
  success = 'success',
  warning = 'warning',
  danger = 'danger'
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }

  async showToast(message: string, type: ToastType) {
    const toast = await this.toastController.create({
      message,
      color: type,
      duration: 1500,
      position: 'top'
    });
    await toast.present();
  }
}
