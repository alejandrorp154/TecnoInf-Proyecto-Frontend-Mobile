import { Component, OnInit } from '@angular/core';
import { Ubicacion } from '../modelos/ubicacion.model';
import { VisualizarUbicacionesService } from '../servicios/visualizar-ubicaciones.service';

@Component({
  selector: 'app-visualizar-ubicaciones',
  templateUrl: './visualizar-ubicaciones.page.html',
  styleUrls: ['./visualizar-ubicaciones.page.scss'],
})
export class VisualizarUbicacionesPage implements OnInit {

  ubicaciones: Ubicacion[];

  constructor(private ubicacionesService: VisualizarUbicacionesService) { }

  ngOnInit() {
    this.getAllUbicaciones();
  }

  async getAllUbicaciones(){
    this.ubicaciones = await this.ubicacionesService.getAllInteresesAsync();
  }

}
