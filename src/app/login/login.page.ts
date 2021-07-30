import { idPersona } from 'src/app/modelos/publicacion.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Plugins } from '@capacitor/core';

import { AuthService} from '../servicios/auth.service';
import { take } from 'rxjs/operators';
import { Usuario } from '../modelos/usuario.model';
import { HttpClient } from '@angular/common/http';
import { UserFire } from '../modelos/userFire.model';
import { IniciarSesionService } from '../servicios/iniciar-sesion.service';
import { AuthResponseData } from '../modelos/AuthResponseData.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  isLoading = false;
  isLogin = true;
  private userFire: UserFire;
  private user: Usuario;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private iniciarSesionService: IniciarSesionService) { }

  ngOnInit() {
  }

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
            this.getUserID().then( res =>
              {
                this.getCurrentUser().then(res =>{
                  if(this.user.administrador){
                    this.router.navigateByUrl('/admin-page');
                  }
                  else if(!this.user.estaBloqueado){
                    this.router.navigateByUrl('/home');
                  }
                  else
                  {
                    let message = 'Su cuenta se encuentra suspendida indefinidamente.'
                    this.showAlert(message)
                  }
                })
              }
            )
            this.isLoading = false;
            loadingEl.dismiss();
          },
          errRes => {
            loadingEl.dismiss();
            const code = errRes.error.error.message;
            let message = 'Hubo un error inesperado, intentelo nuevamente.';
            if (code === 'EMAIL_NOT_FOUND') {
              message = 'Los datos son incorrectos.';
            } else if (code === 'INVALID_PASSWORD') {
              message = 'Los datos son incorrectos.';
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
    const email = form.value.email;
    const password = form.value.password;

    this.authenticate(email, password);
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

  async getUserID()
  {
    this.userFire = await this.authService.getCurrentUserFire().toPromise()
  }
  async getCurrentUser()
  {
    this.user = await this.iniciarSesionService.getLoguedUser(this.userFire.id);
    this.iniciarSesionService.storeUserData(this.user);
  }
}
