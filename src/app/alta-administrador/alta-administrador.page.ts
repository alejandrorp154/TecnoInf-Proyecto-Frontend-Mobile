import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioAdmin } from '../modelos/usuarioAdmin.model';
import { AuthService } from '../servicios/auth.service';
import { UserFire } from '../modelos/userFire.model';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthResponseData } from '../modelos/AuthResponseData.interface';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-alta-administrador',
  templateUrl: './alta-administrador.page.html',
  styleUrls: ['./alta-administrador.page.scss'],
})
export class AltaAdministradorPage implements OnInit {

  constructor(
    @Inject('BASE_URL') private baseUrl: string,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private httpClient: HttpClient,
    private alertCtrl: AlertController) { }
  usuarioAdmin: UsuarioAdmin;
  userFire: UserFire;
  isLoading;

  ngOnInit() {
  }

  onSubmit(form: NgForm)
  {
    if (!form.valid) {
      return;
    }
    this.usuarioAdmin = new UsuarioAdmin("", form.value.nombre, form.value.apellido, form.value.email)
    this.authenticate(form.value.email, form.value.password);
    form.reset();
  }

  authenticate(email: string, password: string) {
    this.isLoading = true;
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Conectandose...' })
      .then(loadingEl => {
        loadingEl.present();
        let authObs: Observable<AuthResponseData>;
        authObs = this.authService.signup(email, password);

        authObs.subscribe(
          resData => {
            this.usuarioAdmin.idPersona = resData.localId;
            this.callBackend();
            this.isLoading = false;
            loadingEl.dismiss();
          },
          errRes => {
            loadingEl.dismiss();
            const code = errRes.error.error.message;
            let message = 'Hubo un error inesperado, intentelo nuevamente.';
            if (code === 'EMAIL_EXISTS') {
              message = 'Este correo ya se a registrado.';
            } else if (code === 'EMAIL_NOT_FOUND') {
              message = 'No se encontro el correo ingresado.';
            } else if (code === 'INVALID_PASSWORD') {
              message = 'La contraseña es incorrecta.';
            }
            this.showAlert(message);
          }
        );
      });
  }

  private showAlert(message: string) {
    this.alertCtrl
      .create({
        header: 'Fallo de autentificación',
        message: message,
        buttons: ['Ok']
      })
      .then(alertEl => alertEl.present());
  }

  private callBackend()
  {
      try {
        const url = `${this.baseUrl}usuario/altaAdministrador`;
        console.log(this.usuarioAdmin);
        let response = this.httpClient.post(url, this.usuarioAdmin).toPromise()
      } catch (error) {
        console.log(error);
      }
  }

  async getUserID()
  {
    this.userFire = await this.authService.getCurrentUserFire().toPromise()
  }

}
