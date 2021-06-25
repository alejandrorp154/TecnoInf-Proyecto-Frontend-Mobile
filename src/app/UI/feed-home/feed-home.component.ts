import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Publicacion, PublicacionPerfilUsuario } from 'src/app/modelos/perfil';
import { Persona } from 'src/app/modelos/persona.model';
import { PerfilService } from 'src/app/servicios/perfil.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-feed-home',
  templateUrl: './feed-home.component.html',
  styleUrls: ['./feed-home.component.scss'],
})
export class FeedHomeComponent implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  user = {
    email: '',
    token: '',
    tokenExpirationDate: '',
    userId: ''
  }

  publicacionesAux: PublicacionPerfilUsuario[];
  publicaciones: PublicacionPerfilUsuario[];
  usuarios: Persona[] = new Array<Persona>();
  size: number = 10;
  offsize: number = 0;

  constructor(private pubService: PerfilService, private userService: UsuarioService) { }

  async ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('_cap_authData'));
    this.publicaciones = await this.pubService.obtenerPublicaciones(this.user.userId,this.size);
  }

  async loadData(event?) {

    this.publicacionesAux = await this.pubService.obtenerPublicaciones(this.user.userId, this.size, event);
    this.publicacionesAux.forEach(element => {
      this.publicaciones.push(element)
    });

  }

}
