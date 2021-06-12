import { Injectable } from '@angular/core';
import { Usuario } from '../modelos/usuario.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IniciarSesionService {

  baseUrl: string = 'http://18.217.108.158:8080/pryectoBack-web/rest';
  constructor(private httpClient: HttpClient) { }


  getLoguedUser(userID: string): Promise<Usuario>
  {
    try {
      const url = `${this.baseUrl}/usuario/${userID}`;
      return this.httpClient.get<Usuario>(url).toPromise()
    } catch (error) {
      console.log(error);
    }
  }


}
