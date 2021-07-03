import { Component, Input, OnInit } from '@angular/core';
import { Preview } from 'src/app/modelos/preview';
import { Publicacion } from 'src/app/modelos/perfil';

@Component({
  selector: 'app-pub-ee',
  templateUrl: './pub-ee.component.html',
  styleUrls: ['./pub-ee.component.scss'],
})
export class PubEeComponent implements OnInit {

  @Input() publicacion: Publicacion;

  constructor() { }

  preview: Preview = new Preview;


  ngOnInit() {
    if (this.publicacion.tipo.tipo == 'enlaceExterno') {
      var prev: string[];
      prev = this.publicacion.contenido.split('|*|');
      this.preview.title = prev[0];
      this.preview.description = prev[1];
      this.preview.image = prev[2];
      this.preview.url = prev[3];
    }
  }

}
