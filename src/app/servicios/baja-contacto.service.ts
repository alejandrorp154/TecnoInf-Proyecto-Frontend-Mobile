import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BajaContactoService {

  private baseUrl = 'http://18.217.108.158:8080/pryectoBack-web/rest';

  constructor(public httpClient: HttpClient) { }

  deleteInteres(idUsuario: string, idUsuarioBaja: string){
    const url = `${this.baseUrl}/usuario/bajaContacto/${idUsuario}/${idUsuarioBaja}`;
    return this.httpClient.delete(url).toPromise();
  }

}
