import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Usuario } from '../modelos/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class ListarUsuariosRegistradosService {

  constructor(public httpClient: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  public getAllUsuariosRegistradosAsync(): Promise<Usuario[]> {
    try {
      const url = `${this.baseUrl}visualizacion/obtenerUsuarios/0/5000`;
      return this.httpClient.get<Usuario[]>(url).toPromise();

    } catch (error) {
      console.log(error);
    }
  }
}
