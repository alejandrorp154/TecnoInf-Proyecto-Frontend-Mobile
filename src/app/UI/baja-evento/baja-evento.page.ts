import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ConfirmacionModalComponent } from '../confirmacion-modal/confirmacion-modal.component';

@Component({
  selector: 'app-baja-evento',
  templateUrl: './baja-evento.page.html',
  styleUrls: ['./baja-evento.page.scss'],
})
export class BajaEventoPage implements OnInit {

  eventos: string[];
  backdrop: boolean;

  constructor(public modalController: ModalController) {
    this.eventos = ['Carnaval de Río de Janeiro', 'Año Nuevo Chino', 'St. Patrick’s Day', 'Oktoberfest', 'Día de los Muertos']
  }

  ngOnInit() {
  }

  async eliminarModal(evento: string) {
    this.backdrop = false;
    const modal = await this.modalController.create({
      component: ConfirmacionModalComponent,
      cssClass: 'confirmacion-modal',
      componentProps: {
        'tipo': 'confirmacion',
        'mensaje': '¿Desea eliminar el evento ' + evento + '?'
      }
    });
    modal.onDidDismiss().then(res => {
      console.log(res);
      console.log(res.data.result ? 'Aceptó el diálogo' : 'Canceló el diálogo');
    });
    //this.backdrop = false;
    return await modal.present();
  }

}
