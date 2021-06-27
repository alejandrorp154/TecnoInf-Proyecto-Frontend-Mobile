import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Comentario, comentarioReacciones } from '../modelos/comentario.model';
import { ComentarioReaccion, PublicacionReaccion } from '../modelos/comentarioReaccion.model';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  constructor(public httpClient: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }
  
  addComentario(comentario: Comentario): Promise<Comentario> {
    const url = `${this.baseUrl}publicacionComentario/comentario`;
    return this.httpClient.post<Comentario>(url, comentario).toPromise();
  }

  deleteComentario(idComentario: string){
    const url = `${this.baseUrl}publicacionComentario/comentario/${idComentario}`;
    return this.httpClient.delete(url).toPromise();
  }

  modificarComentario(comentarioModificado: comentarioReacciones): Promise<any>{
    const url = `${this.baseUrl}publicacionComentario/comentario/modificar`;
    return this.httpClient.post<comentarioReacciones>(url, comentarioModificado).toPromise();
  }

  addComentarioReaccion(comentarioReaccion: ComentarioReaccion): Promise<ComentarioReaccion> {
    const url = `${this.baseUrl}publicacionComentario/comentario/reaccionar`;
    return this.httpClient.post<ComentarioReaccion>(url, comentarioReaccion).toPromise();
  }

  addPublicacionReaccion(comentarioReaccion: PublicacionReaccion): Promise<any> {
    const url = `${this.baseUrl}publicacionComentario/publicacion/reaccionar`;
    return this.httpClient.post<PublicacionReaccion>(url, comentarioReaccion).toPromise();
  }

  getComentariosPublicacion(idPub): Promise<Comentario[]>{
    console.log("servicio: ", idPub);
    const url = `${this.baseUrl}publicacionComentario/comentarios/${idPub}`;
    return this.httpClient.get<Comentario[]>(url).toPromise();
  }

}


