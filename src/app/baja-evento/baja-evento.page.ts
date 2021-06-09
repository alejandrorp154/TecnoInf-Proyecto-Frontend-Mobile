import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-baja-evento',
  templateUrl: './baja-evento.page.html',
  styleUrls: ['./baja-evento.page.scss'],
})
export class BajaEventoPage implements OnInit {

  eventos: string[];
  backdrop: boolean;

  constructor(public alertController: AlertController) {
    this.eventos = ['Carnaval de Río de Janeiro', 'Año Nuevo Chino', 'St. Patrick’s Day', 'Oktoberfest', 'Día de los Muertos']
  }

  ngOnInit() {
  }

  async eliminarModal(evento: string) {
    this.backdrop = false;
    const alert = await this.alertController.create({
      cssClass: 'dialogo-si-no',
      header: 'Alerta',
      subHeader: 'Confirmación',
      message: '¿Desea eliminar el evento ' + evento + '?',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);

    //return await alert.present();
  }


}
