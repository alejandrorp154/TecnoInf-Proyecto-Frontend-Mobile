import { Usuario } from "src/app/modelos/usuario.model";
import { UsuarioService } from "./../servicios/usuario.service";
import { Component, OnInit } from '@angular/core';
import { AlertController, IonItemSliding, IonList, LoadingController } from "@ionic/angular";
import { AuthService } from "../servicios/auth.service";
import { UserFire } from '../modelos/userFire.model';
import { BehaviorSubject, Observable } from "rxjs";

@Component({
  selector: 'app-tab-gestion-usuarios',
  templateUrl: './tab-gestion-usuarios.page.html',
  styleUrls: ['./tab-gestion-usuarios.page.scss'],
})
export class TabGestionUsuariosPage implements OnInit {

  bsUsuarios: BehaviorSubject<Usuario[]> = new BehaviorSubject<Usuario[]>([]);
  usuarios: Usuario[];
  user: Usuario;
  showError: boolean;
  errorMessage: string;
  userFire: UserFire;
  isLoading: boolean;
  loading: HTMLIonLoadingElement;

  constructor(private usuarioService: UsuarioService, private alertCtrl: AlertController, private authService: AuthService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.getAllUsuarios();
  }

  async getAllUsuarios(){
    this.usuarios = await this.usuarioService.getAllUsuariosRegistradosAsync();
    this.bsUsuarios.next(this.usuarios);
    this.isLoading = false;
  }

  onBloquearUsuario(idPersona: string){
    console.log('Bloquear',idPersona);
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
              this.usuarioService.bloquearUsuario(idPersona).then(res => {
                console.log(res);
                this.usuarios.find(u => u.idPersona == idPersona).estaBloqueado = true;
                this.bsUsuarios.next(this.usuarios);
              });
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

  onDesbloquearUsuario(idPersona: string){
    console.log('Desbloquear',idPersona);
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
            handler: () => {
              this.usuarioService.desbloquearUsuario(idPersona).then(res => {
                console.log(res);
                this.usuarios.find(u => u.idPersona == idPersona).estaBloqueado = false;
                this.bsUsuarios.next(this.usuarios);
              });
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
