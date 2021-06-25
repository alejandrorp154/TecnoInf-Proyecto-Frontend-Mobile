import { AlertController } from "@ionic/angular";
import { UserFire } from "./../../modelos/userFire.model";
import { AuthService } from "src/app/servicios/auth.service";
import { idPersona } from "src/app/modelos/publicacion.model";
import { UsuarioService } from "./../../servicios/usuario.service";
import { ConfiguracionesService } from "./../../servicios/configuraciones.service";
import { Component, OnInit } from '@angular/core';
import { Configuracion } from "src/app/modelos/configuracion.model";

@Component({
  selector: 'app-configuracion-notificaciones',
  templateUrl: './configuracion-notificaciones.page.html',
  styleUrls: ['./configuracion-notificaciones.page.scss'],
})
export class ConfiguracionNotificacionesPage implements OnInit {

  constructor(private configuracionService: ConfiguracionesService, private authService: AuthService, private alertCtrl: AlertController) { }

  configuraciones: Configuracion;
  user: UserFire;
  configuracionAMostrar: Configuracion;

  showError: boolean;
  errorMessage: string;

  async ngOnInit() {
    this.user = await this.authService.getCurrentUserFire().toPromise();
    if(this.user != null){
      await this.getConfiguraciones(this.user.id);
    }
  }

  async getConfiguraciones(idPersona: string){
    this.configuraciones = await this.configuracionService.getConfiguraciones(idPersona);
    this.configuracionAMostrar = this.configuraciones;
  }

  checkedChanged(configKey: any, configValue: any){
    this.configuraciones[configKey] = !configValue;
  }

  onAplicar(){
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
            await this.configuracionService.configurarNotificaciones(this.configuraciones);
            await this.getConfiguraciones(this.user.id);
            window.location.reload();

          }
        }
      ]
    }).then(alertElement => {
      alertElement.present();
    })
  }
}
