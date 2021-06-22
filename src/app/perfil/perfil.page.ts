import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Medalla } from '../modelos/medalla.model';
import { Perfil, Publicacion } from '../modelos/perfil';
import { Usuario } from '../modelos/usuario.model';
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
  medalla: BehaviorSubject<Medalla> = new BehaviorSubject(new Medalla());

  constructor(private perfilServ: PerfilService, private router: ActivatedRoute) {
   }

  ngOnInit() {
    this.router.paramMap.subscribe(
      params => {
          const id = params.get('id');
          this.obtenerPerfil(id.toString());
      }
  );
  }

  async obtenerPerfil(id: string){
    this.perfil = await this.perfilServ.obtenerPerfil(id); //Usuario por id
    this.perfilServ.usuarioDatos = this.perfil.usuario;
    this.publicaciones.next(this.perfil.publicaciones.reverse());
    this.usuario.next(this.perfil.usuario);
    this.medalla.next(this.perfil.usuario.medalla);

  }

}
