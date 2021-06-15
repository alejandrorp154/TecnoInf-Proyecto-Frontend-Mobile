import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medalla, rangos } from '../modelos/medalla.model';

@Injectable({
  providedIn: 'root'
})
export class MedallaService {


  private baseUrl = 'http://3.18.102.215:8080/pryectoBack-web/rest';

  constructor(public httpClient: HttpClient) { }

  public async getAllMedallasAsync(): Promise<Medalla[]> {
    try {
      const url = `${this.baseUrl}/medalla/`;
      let response = await this.httpClient.get(url).toPromise();
      return response as Medalla[];
    } catch (error) {
      console.log(error);
    }
  }

  public async visualizarProgreso(idPersona: string): Promise<any>{
    try {
      const url = `${this.baseUrl}/visualizarProgreso/${idPersona}`
      let response = await this.httpClient.get(url).toPromise();
      console.log(response);
      return response as any;
    }catch(error){
      console.log(error);
    }
  }

  public getRangos(){
    return rangos;
  }
}
