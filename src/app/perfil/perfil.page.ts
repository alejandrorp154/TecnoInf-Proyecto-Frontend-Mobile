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

  esMiPerfil: boolean = true;

  textoBoton = '';

  listaContactos = [];

  constructor(
    private perfilServ: PerfilService,
    private router: ActivatedRoute,
    private authService: AuthService,
    private usuarioService: UsuarioService
    )
    {
    }

  async ngOnInit() {
    console.log('es mi perfil al principio de ngonInit', this.esMiPerfil);
    this.userFire = await this.authService.getCurrentUserFire().toPromise();
    this.tieneSolicitudPendiente();
    this.listaContactos = await this.usuarioService.getContactos(this.userFire.id, 10, null);
    this.router.paramMap.subscribe(
      params => {
        const id = params.get('id');
        this.obtenerPerfil(id.toString());
        this.idPerfil = id;
        let contacto = this.esContacto(this.idPerfil);
        let esperfil = this.EsMiPerfil();
        console.log('es contacto', contacto);
        if(esperfil && contacto){
          this.textoBoton = 'ELIMINAR CONTACTO';
        }
        else{
          this.textoBoton = 'AGREGAR CONTACTO';
        }
      }
    );
    console.log('es mi perfil al final de ngonInit', this.esMiPerfil);

  }


  esContacto(perfil: string){
    console.log('me fijo si este perfil es mi contacto', perfil)
    let lista = this.listaContactos;
    console.log(lista);
    var interesExiste = this.listaContactos.find(inte => {
      return inte.idPersona === perfil
    });

    return interesExiste != null ? true : false;
  }

  async EsMiPerfil(){
    this.userFire = await this.authService.getCurrentUserFire().toPromise();
    console.log('este es el logueado>' + this.userFire.id + ' este es el perfil al que entre> ' +this.idPerfil);

    this.esMiPerfil = this.userFire.id === this.idPerfil;
    console.log('es mi perfil', this.esMiPerfil);
    return this.esMiPerfil;
  }

  clickBoton(){

    if(this.textoBoton === 'AGREGAR CONTACTO'){
      this.usuarioService.agregarContacto(this.userFire.id, this.idPerfil);
      this.textoBoton = 'PENDIENTE';
    }
    if(this.textoBoton === 'ELIMINAR CONTACTO'){
      this.usuarioService.bajaContacto(this.userFire.id, this.idPerfil);
      this.textoBoton = 'AGREGAR CONTACTO';
    }
    //if es pendiente que muestre un alert para cancelar la solicitud



  }

  async obtenerPerfil(id: string){
    this.perfil = await this.perfilServ.obtenerPerfil(id); //Usuario por id
    this.perfilServ.usuarioDatos = this.perfil.usuario;
    this.publicaciones.next(this.perfil.publicaciones.reverse());
    this.usuario.next(this.perfil.usuario);
    this.medalla.next(this.perfil.usuario.medalla);
    this.galleria.next(this.perfil.galerias)
  }

  async tieneSolicitudPendiente(){
    let response = await this.usuarioService.tieneSolicitudPendiente(this.userFire.id, this.idPerfil);
    console.log('sol pendiente',response);
    return response;
  }

}
