import { Inject, Injectable } from '@angular/core';
import { Usuario } from '../modelos/usuario.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IniciarSesionService {

  constructor(@Inject('BASE_URL') private baseUrl: string, private httpClient: HttpClient) { }


  getLoguedUser(userID: string): Promise<Usuario>
  {
    try {
      const url = `${this.baseUrl}usuario/${userID}`;
      return this.httpClient.get<Usuario>(url).toPromise()
    } catch (error) {
      console.log(error);
    }
  }


}
