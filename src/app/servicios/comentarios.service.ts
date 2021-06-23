import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Comentario } from '../modelos/comentario.model';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  constructor(public httpClient: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }
  
  addComentario(comentario: Comentario): Promise<Comentario> {
    const url = `${this.baseUrl}publicacionComentario/comentario`;
    return this.httpClient.post<Comentario>(url, comentario).toPromise();
  }

}


