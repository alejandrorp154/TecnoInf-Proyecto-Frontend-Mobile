import { UsuarioService } from './usuario.service';
import { Inject, Injectable } from '@angular/core';
import { MedallaService } from './medalla.service';
import { HttpClient } from '@angular/common/http';
import { Estadistica } from '../modelos/estadistica.model';

@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {

  constructor(private userService: UsuarioService, private httpClient: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  public async getTipoEstadisticaAsync(tipoEstadistica: string): Promise<Estadistica[]> {
    try {
      const url = `${this.baseUrl}/visualizacion/estadistica/${tipoEstadistica}`;
      let response = await this.httpClient.get(url).toPromise();
      console.log(response);
      return response as Estadistica[];
    } catch (error) {
      console.log(error);
    }
  }

  obtenerUsuariosRegistrados(){
    return this.userService.getAllUsuariosAsync();
  }


}
