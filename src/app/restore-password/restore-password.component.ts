import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.scss'],
})
export class RestorePasswordComponent implements OnInit {

  constructor(private router: Router, 
    private authSrv: AuthService) { }

  ngOnInit() {}


  restorePassword(email){

    this.authSrv.restorePassword(email).then(() => {
      console.log('Enviado a ' + email)
    })
  }

}
