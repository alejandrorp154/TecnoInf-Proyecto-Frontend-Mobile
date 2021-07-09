import { idPersona } from "src/app/modelos/publicacion.model";
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Configuracion } from 'src/app/modelos/configuracion.model';
import { UserFire } from 'src/app/modelos/userFire.model';
import { AuthService } from 'src/app/servicios/auth.service';
import { configIdPersona, ConfiguracionesService } from "src/app/servicios/configuraciones.service";

@Component({
  selector: 'app-tab-push-notificacion',
  templateUrl: './tab-push-notificacion.page.html',
  styleUrls: ['./tab-push-notificacion.page.scss'],
})
export class TabPushNotificacionPage implements OnInit {

  constructor(private configuracionService: ConfiguracionesService, private authService: AuthService, private alertCtrl: AlertController) { }

  configuracionesPush: Configuracion;
  user: UserFire;
  configuracionAMostrarPush: Configuracion;

  cIdPersona: string;
  cIsEmailNoti: boolean;
  cIdConfig;

  showError: boolean;
  errorMessage: string;
  async ngOnInit() {
    this.user = await this.authService.getCurrentUserFire().toPromise();
    if(this.user != null){
      await this.getConfiguraciones(this.user.id);
      console.log(this.configuracionAMostrarPush);

    console.log('configIdPersona',configIdPersona);
    }
  }

  async getConfiguraciones(idPersona: string){
    this.configuracionesPush = await this.configuracionService.getConfiguracionesPUSH(idPersona);
    console.log('push', this.configuracionesPush);
    this.configuracionAMostrarPush = this.configuracionesPush;

  }

  checkedChangedPUSH(configKeyP: any, configValueP: any){
    console.log('PUSH');
    this.configuracionesPush[configKeyP] = !configValueP;
  }

  onAplicar(){
    this.configuracionAMostrarPush.idPersona = this.user.id;
    this.configuracionAMostrarPush.emailNotification = false;
    this.configuracionAMostrarPush.idConfiguracion = configIdPersona;

    console.log('PUSH', this.configuracionAMostrarPush);
    this.alertCtrl.create({
      header: 'Configurar Notificaciones',
      message: '¿Estas seguro de que deseas aplicar esta configuracion?',
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
            await this.configuracionService.configurarNotificacionesPUSH(this.configuracionAMostrarPush);
            await this.getConfiguraciones(this.user.id);

          }
        }
      ]
    }).then(alertElement => {
      alertElement.present();
    })
  }

}
