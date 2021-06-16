import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

export enum Resultado {
  Ok,
  Error
}

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor(public toastController: ToastController) { }

  public async presentToast(mensaje: string, resultado: Resultado) {
    const toast = await this.toastController.create({
      color: resultado == Resultado.Ok ? 'dark' : 'red',
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }
}
