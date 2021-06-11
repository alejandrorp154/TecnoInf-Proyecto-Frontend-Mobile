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

  ngOnInit() {
    this.obtenerPerfil();
  }

  async obtenerPerfil(){
    this.perfil = await this.perfilServ.obtenerPerfil('1');
    this.publicaciones.next(this.perfil.publicaciones);
    
  }


}
