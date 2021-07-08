import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { Usuario } from '../../modelos/usuario.model';
import { SugerirAmigosService } from '../../servicios/sugerir-amigos.service';
import { UserFire } from '../../modelos/userFire.model';

@Component({
  selector: 'app-sugerir-amigos',
  templateUrl: './sugerir-amigos.page.html',
  styleUrls: ['./sugerir-amigos.page.scss'],
})
export class SugerirAmigosPage implements OnInit {
  amigos: Usuario[];
  amigosAux: Usuario[];
  userFire: UserFire;
  isLoading :Boolean;

  constructor(private authService: AuthService, private sugerirAmigos: SugerirAmigosService) {
    this.amigos = []
    this.amigosAux = []
  }

  ngOnInit() {
    this.getSugerirAmigos()
  }

  async getSugerirAmigos(event?)
  {
    this.isLoading = true;
    this.userFire = await this.authService.getCurrentUserFire().toPromise()
    console.log(this.userFire.id)
    this.amigosAux = await this.sugerirAmigos.getUsuariosSugeridosAsync(this.userFire.id, 10, event);
    this.amigosAux.forEach(element => {
      this.amigos.push(element)

    });
    this.isLoading = false;

  }

  onViewProfile()
  {

  }

}
