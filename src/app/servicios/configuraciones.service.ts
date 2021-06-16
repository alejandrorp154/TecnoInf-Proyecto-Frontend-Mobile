import { Configuracion } from "./../modelos/configuracion.model";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionesService {

  constructor(private httpClient: HttpClient) { }

  configuraciones: Configuracion[];

  private baseUrl = 'http://18.217.108.158:8080/pryectoBack-web/rest/configSistema';

  async configurarNotificaciones(config: Configuracion){
    try{
      const url = `${this.baseUrl}/configurarNotificaciones`;
      let response = this.httpClient.put(url, config);
      console.log(response);
    }catch(error){
      console.log(error);
    }

  }

  async getConfiguraciones(){
    try{
      const url = `${this.baseUrl}/configurarNotificaciones`;
      let response = await this.httpClient.get(url).toPromise();
      this.configuraciones = response as Configuracion[];
      console.log(response);
      return this.configuraciones;
    }catch(error){
      console.log(error);
    }
  }
}
