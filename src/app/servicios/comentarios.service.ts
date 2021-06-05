import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comentario } from '../Models/comentario.model';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  constructor(public httpClient: HttpClient) { }

  private baseUrl = 'http://3.18.102.215:8080/pryectoBack-web/rest';

  public async getAllComentariosAsync(): Promise<Comentario[]> {
    try {
      const url = `${this.baseUrl}/comentario`;
      let response = await this.httpClient.get(url).toPromise();
      return response as Comentario[];
    } catch (error) {
      console.log(error);
    }
  }

  addComentario(comentario: Comentario) {
    try {
      const url = `${this.baseUrl}/comentario`;
      let response = this.httpClient.post(url,comentario);
    } catch (error) {
      console.log(error);
    }
  }

  deleteInteres(idComentario: string){
    try {
      const url = `${this.baseUrl}/comentario`;
      //let response = this.httpClient.delete(url,idComentario);
    } catch (error) {
      console.log(error);
    }
  }

  modifyInteres(idInteres: string, interesNuevo: string){
    try {
      const url = `${this.baseUrl}/comentarioMod`;
      //envio un comentario de modelo Comentario o solo el id?
      //let response = this.httpClient.post(url, idInteres, interesNuevo)
    } catch (error) {
      console.log(error);
    }
  }

}


