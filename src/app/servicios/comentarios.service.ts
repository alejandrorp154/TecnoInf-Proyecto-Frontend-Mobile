import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Comentario } from '../modelos/comentario.model';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  constructor(public httpClient: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }


  /* habrá que hacer un get all publicaciones aca?
  public getAllComentariosAsync(): Promise<Comentario[]> {
    try {
      const url = `${this.baseUrl}/publicacionComentario/comentario`;
      return this.httpClient.get<Comentario[]>(url).toPromise();
    } catch (error) {
      console.log(error);
    }
  }*/

  addComentario(comentario: Comentario): Promise<Comentario> {
    const url = `${this.baseUrl}publicacionComentario/comentario`;
    return this.httpClient.post<Comentario>(url, comentario).toPromise();
  }

  /*
  deleteComentario(idComentario: string){
    try {
      const url = `${this.baseUrl}/comentario${idComentario}`;
      return this.httpClient.delete(url).toPromise();
    } catch (error) {
      console.log(error);
    }
  }

  modifyComentario(idComentario: string, comentarioNuevo: string){

    //armar el comentario en base a la clase 

    const url = `${this.baseUrl}/comentarioMod`;
    return this.httpClient.put<Interes>(url, modInteres).toPromise();
  }*/

}


