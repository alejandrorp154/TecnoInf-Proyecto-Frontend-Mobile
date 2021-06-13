import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Medalla, Perfil, Publicacion, Usuario } from '../modelos/perfil';
import { PerfilService } from '../servicios/perfil.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  perfil: Perfil;

  datoUsuario = {
    email: '',
    token: '',
    tokenExpirationDate: '',
    userId: ''
  }

  publicaciones: BehaviorSubject<Publicacion[]> = new BehaviorSubject([]);
  usuario: BehaviorSubject<Usuario> = new BehaviorSubject(undefined);
  medalla: BehaviorSubject<Medalla> = new BehaviorSubject(undefined);

  constructor(private perfilServ: PerfilService) { }

  ngOnInit() {
    this.datoUsuario = JSON.parse(localStorage.getItem('_cap_authData'));
    this.obtenerPerfil();
  }

  async obtenerPerfil(){
    this.perfil = await this.perfilServ.obtenerPerfil('1');
    //this.perfil = await this.perfilServ.obtenerPerfil(this.datoUsuario.userId); //Usuario logeado
    this.publicaciones.next(this.perfil.publicaciones);
    this.usuario.next(this.perfil.usuario);
    this.medalla.next(this.perfil.usuario.medalla);
  }


}
