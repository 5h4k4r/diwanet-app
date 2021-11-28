import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
  ) { }
  async toastMessage(options?: { message: string, position?: 'top' | 'bottom' | 'middle', duration?: number }) {
    const toast = await this.toastController.create({
      message: options?.message,
      // cssClass: 'danger',
      position: options?.position ?? 'bottom',
      duration: options?.duration ?? 2000
    });
    toast.present();
  }
  async errorAlert(options?: { title?: string, message?: string }) {
    const alert = await this.alertController.create({
      header: options.title ?? '',
      message: options.message ?? '',
      buttons: ['OK']
    });

    await alert.present();
  }
  async InfoAlert(options?: { title?: string, message?: string }) {
    const alert = await this.alertController.create({
      header: options?.title ?? '',
      message: options?.message ?? '',
      buttons: ['OK']
    });

    await alert.present();
  }
}
