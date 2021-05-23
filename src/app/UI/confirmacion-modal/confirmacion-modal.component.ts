import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-confirmacion-modal',
  templateUrl: './confirmacion-modal.component.html',
  styleUrls: ['./confirmacion-modal.component.scss'],
})
export class ConfirmacionModalComponent {

  @Input() tipo: string;
  @Input() mensaje: string;

  constructor(public modalController: ModalController) { }

  dismiss(value: any) {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'result': value
    });
  }

}
