import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Publicacion } from 'src/app/modelos/perfil';
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

  publicaciones: Publicacion[];
  usuarios: Persona[] = new Array<Persona>();

  size: number = 10;
  offsize: number = 0;

  constructor(private pubService: PerfilService, private userService: UsuarioService) { }

  async ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('_cap_authData'));
    this.publicaciones = await this.pubService.obtenerPublicaciones(this.user.userId,this.size,this.offsize);
    this.publicaciones.forEach(async element => {
      var usuario = await this.userService.getUsuarioAsync(element.idPersona);
      this.usuarios.push(usuario);
    });
  }

  loadData(event) {
    setTimeout(async () => {
      console.log('Done');
      const nuevasPub = await this.pubService.obtenerPublicaciones(this.user.userId,this.size+10,this.offsize+10);
      this.publicaciones.push( ...nuevasPub );
      event.target.complete();

     
      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      // if (data.length == 1000) {
      //   event.target.disabled = true;
      // }
    }, 500);
  }

}
