import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  datoUsuario = {
    email: '',
    token: '',
    tokenExpirationDate: '',
    userId: ''
  }

  constructor(private authService: AuthService, private alertCtrl: AlertController, private router: Router) { }

  ngOnInit() {
    this.datoUsuario = JSON.parse(localStorage.getItem('_cap_authData'));
  }

  onLogout() {
    this.authService.logout();
  }

  onDeleteAccount()
  {
    this.alertCtrl
    .create({
      header: 'Eliminar cuenta',
      message: 'Esta a punto de borrar permanentemente su cuenta. ¿Seguro que desea continuar?',
      buttons: [
        {
          text: 'Eliminar',
          handler: () => {
            this.authService.token.pipe(take(1)).subscribe(token =>
              {
                if(!token)
                {
                  throw new Error('No se encontro la ID del usuario');
                }
                else
                {
                  let obs: Observable<any>;
                  obs = this.authService.deleteAccount(token);

                  obs.subscribe(
                    errorResponse => {
                      const code = errorResponse.error.error.message;
                      console.log(code)
                    }
                  )
                  this.authService.logout();
                }
              })
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
