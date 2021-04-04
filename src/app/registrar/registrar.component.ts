import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../servicios/auth.service';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import { User } from '../clases/user.class';


@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss'],
})
export class RegistrarComponent implements OnInit {
  
  usuario;

  constructor(private router: Router, 
    private authSrv: AuthService, private alertControl: AlertController, 
    public formBuilder: FormBuilder) {

     }

  ngOnInit() {
    this.usuario = new User();
   }

  async register(nickname, passphrase){
    //console.log("Realizará el registro.");
    this.usuario.email = nickname;
    this.usuario.password = passphrase;
    //console.log(this.usuario);
    if (this.usuario.password.length < 6){
      this.alertControl.create({
        header: 'Contaseña debil',
        message: 'La contraseña debe tener al menos 6 caracteres',
        buttons: ['OK']
      }).then(alert => alert.present());
    }
    const user = await this.authSrv.register(this.usuario);
    if (user){
      this.alertControl.create({
        header: 'Cuenta creada',
        message: 'La cuenta a sido creada',
        buttons: [
         {
            text: 'OK',
            handler: () => {
              this.router.navigate(['/login']);
            }
          }
        ]
      }).then(alert => alert.present());
    }
  }

  onSubmit(nickname, passphrase) {
    console.log("Realizará el registro.");
    this.usuario.email = nickname;
    this.usuario.password = passphrase;
    console.log(this.usuario);
  }

}
