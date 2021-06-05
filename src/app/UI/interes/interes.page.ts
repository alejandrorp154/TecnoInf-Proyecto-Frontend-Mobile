import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Interes } from 'src/app/Models/interes.model';
import { InteresService } from 'src/app/servicios/interes.service';


@Component({
  selector: 'app-interes',
  templateUrl: './interes.page.html',
  styleUrls: ['./interes.page.scss'],
})
export class InteresPage implements OnInit {
  intereses;
  interes: Interes
  showError: boolean
  errorMessage: string

  constructor(private interesesService: InteresService, private alertCtrl: AlertController) { 
    this.interes = new Interes();
    this.showError = false;
  }

  ngOnInit() {
    this.intereses = this.interesesService.getAllInteresesAsync();
  }

  onDeleteInteres(idInteres: string){
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
            handler: () => {
              this.interesesService.deleteInteres(idInteres);
              this.intereses = this.interesesService.getAllInteresesAsync();
              this.showError = false;
            }
          }
        ]
      })
      .then(alertEl => {
        alertEl.present();
      });
  }

  onModificarInteres(idInteres: string, interes: string){
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
          handler: data => {
            if (data.interesNuevo !== '') {
              var interesExiste = this.intereses.find(inte => {
                return inte.interes === data.interesNuevo
              });
              if(!interesExiste){
                this.interesesService.modifyInteres(idInteres, data.interesNuevo.toString());
                this.intereses = this.interesesService.getAllInteresesAsync();
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


  onCreateInteres() {
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
        handler: () => {
          this.interesesService.addInteres(this.interes.interes);
          this.interes.interes = "";
          this.intereses = this.interesesService.getAllInteresesAsync();
          this.showError = false;
        }
      }
    ]
  }).then(alertElement => {
    alertElement.present();
  })
    
  }

}