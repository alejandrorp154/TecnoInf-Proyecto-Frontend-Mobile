import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  publicaciones: BehaviorSubject<Publicacion[]> = new BehaviorSubject([]);
  usuario: BehaviorSubject<Usuario> = new BehaviorSubject(undefined);
  medalla: BehaviorSubject<Medalla> = new BehaviorSubject(undefined);

  constructor(private perfilServ: PerfilService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.obtenerPerfil(this.router.snapshot.params.id);
  }

  async obtenerPerfil(id: string){
    this.perfil = await this.perfilServ.obtenerPerfil(id); //Usuario por id
    //this.perfil = await this.perfilServ.obtenerPerfil(this.datoUsuario.userId); //Usuario logeado

    this.publicaciones.next(this.perfil.publicaciones);
    this.usuario.next(this.perfil.usuario);
    this.medalla.next(this.perfil.usuario.medalla);
  }


}
