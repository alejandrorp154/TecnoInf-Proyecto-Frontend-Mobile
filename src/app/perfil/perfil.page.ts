import { UserFire } from "./../modelos/userFire.model";
import { AuthService } from "src/app/servicios/auth.service";
import { UsuarioService } from "src/app/servicios/usuario.service";
import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Medalla } from '../modelos/medalla.model';
import { Perfil, Publicacion } from '../modelos/perfil';
import { Usuario } from '../modelos/usuario.model';
import { PerfilService } from '../servicios/perfil.service';
import { Multimedia } from '../modelos/multimedia.model';

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
  galleria: BehaviorSubject<Multimedia[]> = new BehaviorSubject([]);

  userFire: UserFire;
  idPerfil;

  esMiPerfil: boolean;

  textoBoton = 'AGREGAR CONTACTO';

  constructor(
    private perfilServ: PerfilService,
    private router: ActivatedRoute,
    private authService: AuthService,
    private usuarioService: UsuarioService
    ) {
   }

  ngOnInit() {
    this.router.paramMap.subscribe(
      params => {
          const id = params.get('id');
          this.obtenerPerfil(id.toString());
          this.idPerfil = id;
      }
  );
  }

  async noEsMiPerfil(){
    this.userFire = await this.authService.getCurrentUserFire().toPromise();
    console.log(this.userFire.id);
    this.esMiPerfil = this.userFire.id === this.idPerfil;
    console.log(this.esMiPerfil);
    return this.esMiPerfil;
  }

  agregarContacto(){
    this.usuarioService.agregarContacto(this.userFire.id, this.idPerfil)
    this.textoBoton = 'PENDIENTE';

  }

  async obtenerPerfil(id: string){
    await this.noEsMiPerfil();
    this.perfil = await this.perfilServ.obtenerPerfil(id); //Usuario por id
    this.perfilServ.usuarioDatos = this.perfil.usuario;
    this.publicaciones.next(this.perfil.publicaciones.reverse());
    this.usuario.next(this.perfil.usuario);
    this.medalla.next(this.perfil.usuario.medalla);
    this.galleria.next(this.perfil.galerias)
  }

}
