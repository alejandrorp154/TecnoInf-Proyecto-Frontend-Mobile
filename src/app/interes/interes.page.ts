import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Interes } from 'src/app/modelos/interes.model';
import { InteresService } from 'src/app/servicios/interes.service';


@Component({
  selector: 'app-interes',
  templateUrl: './interes.page.html',
  styleUrls: ['./interes.page.scss'],
})
export class InteresPage implements OnInit {
  intereses: Interes[];
  interes: Interes
  showError: boolean
  errorMessage: string


  constructor(private interesesService: InteresService, private alertCtrl: AlertController) {
    this.interes = new Interes();
    this.interes.interes = "";
    this.showError = false;
  }

  ngOnInit() {
    this.getAllIntereses();
  }

  enableCreate(){
    return this.interes.interes.trim() === "";
  }

  async getAllIntereses(){
    this.intereses = await this.interesesService.getAllInteresesAsync();
  }

  onDeleteInteres(idInteres: number){
    this.alertCtrl
      .create({
        header: '¿Estas seguro?',
        message: '¿Estas seguro que deseas eliminar este interes?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel'
          },
          {
            text: 'Borrar',
            handler: async () => {
              await this.interesesService.deleteInteres(idInteres);
              await this.getAllIntereses();
              this.showError = false;
            }
          }
        ]
      })
      .then(alertEl => {
        alertEl.present();
      });
  }

  onModificarInteres(idInteres: number, interes: string){
    this.alertCtrl.create({
      header: 'Modificar interés ' + interes,
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

  }


  async onCreateInteres() {


    /*
    var txt = document.getElementById('input-reason').textContent;
    console.log('TXT',txt);
    console.log(this.interes.interes);
    if(this.interes.interes == "" || this.interes.interes == null || this.interes.interes == "undefined"){
      console.log('ESTA VACIO O NULL');
      console.log(this.interes.interes);
      this.errorMessage = "El interés ingresado ya existe.";
      this.showError = true;
      return;
    };*/

    var interesExiste = this.intereses.find(inte => {
      return inte.interes === this.interes.interes
    });

    if(interesExiste){
      this.errorMessage = "El interés ingresado ya existe.";
      this.showError = true;
      return;
    };

    this.alertCtrl.create({
    header: 'Interés agregado exitosamente.',
    message: 'El interés '+this.interes.interes + ' fue agregado exitosamente.',
    buttons: [
      {
        text: 'Okay',
        handler: async () => {
          await this.interesesService.addInteres(this.interes.interes);
          this.interes.interes = "";
          this.getAllIntereses();
          this.showError = false;
        }
      }
    ]
  }).then(alertElement => {
    alertElement.present();
  })

  }

}
