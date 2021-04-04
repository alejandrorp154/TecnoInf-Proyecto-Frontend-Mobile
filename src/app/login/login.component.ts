import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../clases/user.class';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authSrv: AuthService) { }

  user;

  ngOnInit() {
    this.user = new User();
  }

  async login(nickname, passphrase){
    this.user.email = nickname;
    this.user.password = passphrase;
    const user = await this.authSrv.login(this.user);
    if (user){
      this.router.navigateByUrl('/home');
    }
  }

}
