import { AlertController } from "@ionic/angular";
import { Router } from "@angular/router";
import { Usuario } from "src/app/modelos/usuario.model";
import { UserFire } from "./../../modelos/userFire.model";
import { AuthService } from "src/app/servicios/auth.service";
import { UsuarioService } from "src/app/servicios/usuario.service";
import { Component, OnInit } from '@angular/core';
import { EstadosContactos } from "src/app/modelos/contacto.model";

@Component({
  selector: 'app-solicitudes-pendientes',
  templateUrl: './solicitudes-pendientes.page.html',
  styleUrls: ['./solicitudes-pendientes.page.scss'],
})
export class SolicitudesPendientesPage implements OnInit {

  userFire: Usuario;
  solicitudes: Usuario[];
  showError: boolean;
  errorMessage: string;
  aceptada: boolean;

  constructor(private userService: UsuarioService, private authService: AuthService, private alertCtrl: AlertController)
  {
    this.showError = false;
  }

  async ngOnInit() {
    this.userFire = await this.authService.getCurrentUser().toPromise();
    console.log(this.userFire.idPersona);
    this.getSolicitudesPendientes(this.userFire.idPersona);
    console.log(this.solicitudes);
  }

  async getSolicitudesPendientes(id: string){
    this.solicitudes = await this.userService.getSolicitudesPendientes(id);
  }

  onAceptar(idPersona: string){
    this.alertCtrl.create({
      header: 'usuario agregado exitosamente.',
      message: 'Ahora tienes un amigo nuevo.',
      buttons: [
        {
          text: 'Okay',
          handler: async () => {
            await this.userService.respuestaContacto(this.userFire.idPersona, idPersona, EstadosContactos.aceptada);
              await this.getSolicitudesPendientes(this.userFire.idPersona);
              //this.aceptada = true;
              this.showError = false;
          }
        }
      ]
    }).then(alertElement => {
      alertElement.present();
    })
  }

  onRechazar(idPersona: string){
    this.alertCtrl
      .create({
        header: '¿Estas seguro?',
        message: '¿Estas seguro que desea rechazar esta solicitud de contacto?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel'
          },
          {
            text: 'Borrar',
            handler: async () => {
              await this.userService.respuestaContacto(this.userFire.idPersona, idPersona, EstadosContactos.cancelada);
              await this.getSolicitudesPendientes(this.userFire.idPersona);
              //this.aceptada = true;
              this.showError = false;
            }
          }
        ]
      })
      .then(alertEl => {
        alertEl.present();
      });
  }

}
