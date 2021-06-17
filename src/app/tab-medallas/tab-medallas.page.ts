import { rangos } from "./../modelos/medalla.model";
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Medalla } from '../modelos/medalla.model';
import { MedallaService } from '../servicios/medalla.service';

@Component({
  selector: 'app-tab-medallas',
  templateUrl: './tab-medallas.page.html',
  styleUrls: ['./tab-medallas.page.scss'],
})
export class TabMedallasPage implements OnInit {

    medallas: Medalla[];
    medalla: Medalla;
    showError: boolean
    errorMessage: string

    constructor(private medallaService: MedallaService, private alertCtrl: AlertController) {
      this.medalla = new Medalla();
      this.medalla.rango = rangos.ironWolf;
      this.showError = false;
    }


    ngOnInit() {
      this.getAllMedallas();
    }

    async getAllMedallas(){
      this.medallas = await this.medallaService.getAllMedallasAsync();
    }

    /*onModificarMedalla(idMedalla: number, medalla: string){
      this.alertCtrl.create({
        header: 'Modificar medalla ' + medalla,
        inputs: [
          {
            name: 'interesNuevo',
            placeholder: 'Interés'
          }
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Modificar',
            handler: async data => {
              if (data.interesNuevo !== '') {
                var interesExiste = this.intereses.find(inte => {
                  return inte.interes === data.interesNuevo
                });
                if(!interesExiste){
                  await this.interesesService.modifyInteres(idInteres, data.interesNuevo.toString());
                  await this.getAllIntereses();
                  this.showError = false;
                } else {
                  this.errorMessage = "El interés ingresado ya existe.";
                  this.showError = true;
                }
              } else {
                return;
              }
            }
          }
        ]
      }).then(alertElement => {
        alertElement.present();
      })

    }*/
}
