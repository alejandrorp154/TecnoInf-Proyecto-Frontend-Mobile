import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Configuracion } from 'src/app/modelos/configuracion.model';
import { UserFire } from 'src/app/modelos/userFire.model';
import { AuthService } from 'src/app/servicios/auth.service';
import { configIdPersona, ConfiguracionesService } from 'src/app/servicios/configuraciones.service';

@Component({
  selector: 'app-tab-email-notificacion',
  templateUrl: './tab-email-notificacion.page.html',
  styleUrls: ['./tab-email-notificacion.page.scss'],
})
export class TabEmailNotificacionPage implements OnInit {

  constructor(private configuracionService: ConfiguracionesService, private authService: AuthService, private alertCtrl: AlertController) { }

  configuraciones: Configuracion;
  user: UserFire;
  configuracionAMostrar: Configuracion;

  cIdPersona: string;
  cIsEmailNoti: boolean;
  cIdConfig;

  showError: boolean;
  errorMessage: string;
  async ngOnInit() {
    this.user = await this.authService.getCurrentUserFire().toPromise();
    if(this.user != null){
      await this.getConfiguraciones(this.user.id);
      console.log(this.configuracionAMostrar);
      console.log('configIdPersona',configIdPersona);
    }
  }

  async getConfiguraciones(idPersona: string){
    this.configuraciones = await this.configuracionService.getConfiguraciones(idPersona);
    this.configuracionAMostrar = this.configuraciones;
    delete this.configuracionAMostrar.idPersona;
    delete this.configuracionAMostrar.idConfiguracion;
    delete this.configuracionAMostrar.emailNotification;

  }
  onAplicar(){
    this.configuracionAMostrar.idPersona = this.user.id;
    this.configuracionAMostrar.emailNotification = false;
    this.configuracionAMostrar.idConfiguracion = configIdPersona;

    console.log('EMAIL', this.configuracionAMostrar);
    this.alertCtrl.create({
      header: 'Configurar Notificaciones EMAIL',
      message: '¿Estas seguro de que deseas aplicar esta configuracion para email?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: async () => {
            await this.configuracionService.configurarNotificaciones(this.configuracionAMostrar);
            await this.getConfiguraciones(this.user.id);
          }
        }
      ]
    }).then(alertElement => {
      alertElement.present();
    })
  }

  checkedChanged(event, configkey){
    this.configuracionAMostrar[configkey] = event.target.checked;
  }

}
