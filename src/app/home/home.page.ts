import { Component, OnInit } from '@angular/core';
import { Usuario } from '../Models/usuario.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public sugerenciaAmigos: Usuario[]

  constructor() {}

  ngOnInit()
  {

  }

  onPublicar(){
    console.log('Presiono publicar...');
  }

  onShowAllSuggested()
  {
    console.log('aa')
  }
}
