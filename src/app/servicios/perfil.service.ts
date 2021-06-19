import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Perfil } from '../modelos/perfil';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  obtenerPerfil (idPersona: string): Promise<Perfil>{
    return this.http.get<Perfil>(this.baseUrl + 'visualizacion/perfil/' + idPersona).toPromise();
  }

}
