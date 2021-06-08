import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { AuthService, AuthResponseData } from '../servicios/auth.service';
import { Usuario } from '../models/usuario.model';
import { take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  isLoading = false;
  isLogin = false;
  private user: Usuario;
  baseUrl: string = 'http://3.18.102.215:8080/pryectoBack-web/rest';

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private httpClient: HttpClient) { }

  ngOnInit() {}

  authenticate(email: string, password: string) {
    this.isLoading = true;
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Conectandose...' })
      .then(loadingEl => {
        loadingEl.present();
        let authObs: Observable<AuthResponseData>;
        if (this.isLogin) {
          authObs = this.authService.login(email, password);
        } else {
          authObs = this.authService.signup(email, password);
        }
        authObs.subscribe(
          resData => {
            this.callBackend();

            this.isLoading = false;
            loadingEl.dismiss();
            this.router.navigateByUrl('/home');
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

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.user = new Usuario("", form.value.nickname, form.value.nombre, form.value.apellido, form.value.celular, form.value.direccion ,form.value.email)

    console.log(form.value.nombre)

    this.authenticate(form.value.email, form.value.password);
    form.reset();

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
    this.authService.userID.pipe(take(1)).subscribe(userID =>
      {
        if(!userID)
        {
          throw new Error('No se encontro la ID del usuario.');
        }
        else
        {
           this.user.idPersona = userID;
        }
      });

      try {
        const url = `${this.baseUrl}/usuario`;
        console.log(this.user);
        let response = this.httpClient.post(url, this.user).toPromise()
      } catch (error) {
        console.log(error);
      }
  }
}



