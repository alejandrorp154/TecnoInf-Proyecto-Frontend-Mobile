import { Persona } from "./../modelos/persona.model";
import { Usuario } from "src/app/modelos/usuario.model";
import { UsuarioService } from "./../servicios/usuario.service";
import { Component, OnInit } from '@angular/core';
import { AlertController, IonItemSliding, IonList } from "@ionic/angular";

@Component({
  selector: 'app-tab-gestion-usuarios',
  templateUrl: './tab-gestion-usuarios.page.html',
  styleUrls: ['./tab-gestion-usuarios.page.scss'],
})
export class TabGestionUsuariosPage implements OnInit {

  usuarios: Persona[];
  user: Usuario;
  showError: boolean;
  errorMessage: string;

  constructor(private usuarioService: UsuarioService, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.getAllUsuarios();
  }

  ionViewDidEnter(){
  }

  async getAllUsuarios(){
    this.usuarios = await this.usuarioService.getAllUsuariosAsync();
  }

  onBloquearUsuario(idPersona: string, slidingUser: IonItemSliding){
    try{
      this.alertCtrl
      .create({
        header: 'Bloquear Usuario',
        message: '¿Estas seguro que deseas bloquear este usuario?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel'
          },
          {
            text: 'Bloquear',
            handler: async () => {
              await this.usuarioService.bloquearUsuario(idPersona);
              await this.getAllUsuarios();
              this.showError = false;
            }
          }
        ]
      })
      .then(alertEl => {
        alertEl.present();
      });
    }catch(error){
      console.log(error);
    }
  }

  getContactosPersona

  onDesbloquearUsuario(idPersona: string, slidingUser: IonItemSliding){
    try{
      this.alertCtrl
      .create({
        header: 'Desbloquear Usuario',
        message: '¿Estas seguro que deseas desbloquear este usuario?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel'
          },
          {
            text: 'Desbloquear',
            handler: async () => {
              await this.usuarioService.desbloquearUsuario(idPersona);
              //await slidingUser.close();
              await this.getAllUsuarios();
              this.showError = false;
            }
          }
        ]
      })
      .then(alertEl => {
        alertEl.present();
      });
    }catch(error){
      console.log(error);
    }
  }
}
