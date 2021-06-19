import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { RecuperarPasswordService } from '../servicios/recuperar-password.service';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.page.html',
  styleUrls: ['./recuperar-password.page.scss'],
})
export class RecuperarPasswordPage implements OnInit {

  constructor(private recuperar: RecuperarPasswordService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) { }
    message: string;
    header: string;

  ngOnInit() {
  }

  onSubmit(form: NgForm)
  {
    if (!form.valid) {
      return;
    }

    this.loadingCtrl
    .create({ keyboardClose: true, message: 'Enviando...' })
    .then(loadingEl => {
      loadingEl.present();
      let authObs: Observable<any>;
        authObs = this.recuperar.recuperarPassword(form.value.email)

      authObs.subscribe(
        resData => {
          loadingEl.dismiss();
          this.message = 'Revise el correo ingresado para continuar.';
          this.header = 'Correo enviado';
          this.showAlert(this.header, this.message);
        },
        errRes => {
          loadingEl.dismiss();
          const code = errRes.error.error.message;
          this.message = 'Hubo un error inesperado, intentelo nuevamente.';
          this.header = 'Fallo de autentificación';
          if (code === 'EMAIL_NOT_FOUND') {
            this.message = 'No se encontro ninguna cuenta con este correo.';
          }
          this.showAlert(this.header, this.message);
        }

      );
    });
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
}
