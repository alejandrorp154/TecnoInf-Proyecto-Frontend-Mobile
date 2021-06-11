import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Perfil, Publicacion } from '../modelos/perfil';
import { PerfilService } from '../servicios/perfil.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  perfil: Perfil;

  publicaciones: BehaviorSubject<Publicacion[]> = new BehaviorSubject([]);

  constructor(private perfilServ: PerfilService) { }

  user: {
    nombre: string;
    apellido: string;
    nickname: string;
  }

  ngOnInit() {
    this.obtenerPerfil();
    
    // this.user.nombre = this.perfil.usuario.nombre;
    //   this.user.apellido = this.perfil.usuario.apellido;
    //   this.user.nickname =  this.perfil.usuario.nickname;
    //   localStorage.setItem('usuario', JSON.stringify(this.user));
    //    console.log(this.user);
   
  }

  async obtenerPerfil(){
    this.perfil = await this.perfilServ.obtenerPerfil('1');
    this.publicaciones.next(this.perfil.publicaciones);
  }


}
