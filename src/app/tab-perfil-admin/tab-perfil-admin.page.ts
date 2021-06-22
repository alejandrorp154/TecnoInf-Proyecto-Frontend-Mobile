import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from '../modelos/usuario.model';
import { AuthService } from '../servicios/auth.service';
import { ModAdministradorService } from '../servicios/mod-administrador.service';
import { UserFire } from '../modelos/userFire.model';
import { Observable } from 'rxjs';
import { AlertController, LoadingController } from '@ionic/angular';
import { UsuarioAdmin } from '../modelos/usuarioAdmin.model';
import { UsuarioService } from "./../servicios/usuario.service";
import { IniciarSesionService } from '../servicios/iniciar-sesion.service';
import { Plugins } from '@capacitor/core';

@Component({
  selector: 'app-tab-perfil-admin',
  templateUrl: './tab-perfil-admin.page.html',
  styleUrls: ['./tab-perfil-admin.page.scss'],
})
export class TabPerfilAdminPage implements OnInit {

  constructor(private authService: AuthService,
    private modAdmin: ModAdministradorService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private usuarioService: UsuarioService) { }

    private header:string;
    private message: string;
    private callBack: boolean;

    private user: Usuario;
    private userFire: UserFire;
    private usuarioAdmin: UsuarioAdmin;
    public emailDefault: string;
    public nombreDefault: string;
    public apellidoDefault: string;
    public contraDefault: string;

    ngOnInit() {
      this.getUserInfo();
    }

    onSubmit(form: NgForm)
    {

      if (!form.valid) {
        return;
      }
      this.callBack = true;
      this.header = "";
      this.message = "";
      this.emailDefault = form.value.email;
      this.nombreDefault = form.value.nombre;
      this.apellidoDefault = form.value.apellido;

      if (form.value.email != this.user.email)
      {
        this.loadingCtrl
        .create({ keyboardClose: true, message: 'Validando...' })
        .then(loadingEl => {
        let authObs: Observable<any> = this.modAdmin.changeEmail(this.userFire.token, form.value.email)

        authObs.subscribe(resData => {
          this.setNewLocalDataFire(resData.idToken);
          loadingEl.dismiss();

        },
        errRes => {
          loadingEl.dismiss();
          this.callBack = false;
          const code = errRes.error.error.message;
          this.message = 'Hubo un error inesperado, intentelo nuevamente.';
          if (code === 'EMAIL_EXISTS') {
            this.message = 'Este correo ya se a registrado.';
          }
          this.header = 'Fallo de validación';
          this.showAlert(this.header, this.message);
          });
        });
      }

      if(this.callBack === true)
      {
        this.callBackend();
        this.header = 'Modificación exitosa';
        this.message = `Se han cambiado los datos satisfactoriamente`;
        this.showAlert(this.header, this.message);
      }
    }

    async getUserInfo()
    {
      this.user =  await this.authService.getCurrentUser().toPromise()
      this.userFire =  await this.authService.getCurrentUserFire().toPromise()
      this.emailDefault = this.user.email;
      this.nombreDefault = this.user.nombre;
      this.apellidoDefault = this.user.apellido;
    }

    private showAlert(header: string, message: string) {
      this.alertCtrl
        .create({
          header: header,
          message: message,
          buttons: ['Ok']
        })
        .then(alertEl => alertEl.present());
    }

    callBackend()
    {
      this.usuarioAdmin = new UsuarioAdmin(this.userFire.id, this.nombreDefault, this.apellidoDefault, this.emailDefault);
      this.modAdmin.callBackend(this.usuarioAdmin);
      this.setNewLocalData();
    }

    setNewLocalData()
    {
      const data = JSON.stringify({
        idPersona: this.usuarioAdmin.idPersona,
        nickname: "",
        nombre: this.usuarioAdmin.nombre,
        apellido: this.usuarioAdmin.apellido,
        celular: "",
        direccion: "",
        email: this.usuarioAdmin.email,
        pais: "",
        administrador: true,
        imagenPerfil: "",
        nombreImagen: "",
        extension: ""
      });
      Plugins.Storage.set({ key: 'currentUser', value: data });
    }

    setNewLocalDataFire(newToken: string)
    {
      const data = JSON.stringify({
        userId: this.userFire.id,
        token: newToken,
        email: this.emailDefault
      });
      Plugins.Storage.set({ key: 'authData', value: data });

      this.userFire.token = newToken;
    }

    onBorrarCuentaPropia()
    {
      this.alertCtrl
      .create({
        header: 'Eliminar cuenta',
        message: 'Esta a punto de borrar permanentemente su cuenta. ¿Seguro que desea continuar?',
        buttons: [
          {
            text: 'Eliminar',
            handler: async () => {
              this.userFire = await this.authService.getCurrentUserFire().toPromise()
                  console.log(this.userFire)
                    let obs: Observable<any>;
                    obs = this.authService.deleteAccount(this.userFire.token);

                    obs.subscribe(
                      errorResponse => {
                        //const code = errorResponse.error.error.message;
                        console.log(errorResponse)
                      }
                    )
                    this.usuarioService.deleteUsuarioAdmin(this.userFire.id)
                    this.authService.logout();
            },
            cssClass: 'alrtDanger'
          },
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              console.log('Cancelar');
            }
          }
        ]
      })
      .then(alertEl => alertEl.present());
    }

  }
