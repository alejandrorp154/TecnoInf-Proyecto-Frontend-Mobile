import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../Models/usuario.model';
import { SugerirAmigosService } from '../../servicios/sugerir-amigos.service';

@Component({
  selector: 'app-sugerir-amigos',
  templateUrl: './sugerir-amigos.page.html',
  styleUrls: ['./sugerir-amigos.page.scss'],
})
export class SugerirAmigosPage implements OnInit {
  amigos: Usuario[];

  constructor(private sugerirAmigos: SugerirAmigosService) { }

  ngOnInit() {
    this.getSugerirAmigos();
  }

  async getSugerirAmigos(event?)
  {
    this.amigos.concat(await this.sugerirAmigos.getUsuariosSugeridosAsync(event));
  }

  onViewProfile(idUsuario: string)
  {
    const base64Data = ""
  }

}
