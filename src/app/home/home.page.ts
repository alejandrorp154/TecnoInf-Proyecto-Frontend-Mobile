import { UsuarioService } from "src/app/servicios/usuario.service";
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../modelos/usuario.model';
import { UserFire } from '../modelos/userFire.model';
import { AuthService } from '../servicios/auth.service';
import { SugerirAmigosService } from '../servicios/sugerir-amigos.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  userFire: UserFire;
  public amigos: Usuario[]

  constructor(private router: Router, private authService: AuthService, private sugerirAmigos: SugerirAmigosService, private userService: UsuarioService) {}

  async ngOnInit() {
    setTimeout(() => this.delayCall(), 5);
  }


  async delayCall()
  {
    this.userFire = await this.authService.getCurrentUserFire().toPromise()
    this.getSugerirAmigos()
  }

  async getSugerirAmigos(event?)
  {
    this.amigos = await this.sugerirAmigos.getUsuariosSugeridosAsync(this.userFire.id, 3, event);
  }

  onShowAllSuggested()
  {
    this.router.navigateByUrl('/sugerir-amigos');

  }

  ionViewDidEnter(){
   this.userService.getSolicitudesPendientes(this.userFire.id);
  }
}
