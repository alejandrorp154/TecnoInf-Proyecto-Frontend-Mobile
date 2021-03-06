import { HttpClient } from '@angular/common/http';
import { ErrorHandler, Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Publicacion as p, PublicacionPerfilUsuario } from '../modelos/perfil';
import { CantidadReaccionComentario, Publicacion, Reaccion } from '../modelos/publicacion.model';


@Injectable({
  providedIn: 'root'
})
export class PubicacionService {



  constructor(public httpClient: HttpClient, public handleError: ErrorHandler, @Inject('BASE_URL') private baseUrl: string) { }

  altaPublicacion(publicacion: Publicacion){
    console.log(publicacion);
    return this.httpClient.post(this.baseUrl+"publicacionComentario", publicacion).toPromise();
  //   .subscribe({
  //     // error: error => {
  //     //     console.log(error);
  //     // }
  // });
  }

  modificarPublicacion(publicacion: Publicacion){
    return this.httpClient.put(this.baseUrl+"publicacionComentario", publicacion).subscribe({
      error: error => {
          console.log(error);
      }
  });
  }

  eliminarPublicacion(idPublicacion: string){
    this.httpClient.delete(this.baseUrl+"publicacionComentario/publicacion/"+idPublicacion).subscribe({
      error: error => {
          console.log(error);
      }
  });
  }

  obtenerReaccionesComentarios(idPublicacion: string){
    return this.httpClient.get<CantidadReaccionComentario>(this.baseUrl+"publicacionComentario/getCantidadReaccionComentario/"+idPublicacion).toPromise();
  }


  uploadImage(blobData, name, ext) {
    const formData = new FormData();
    formData.append('file', blobData, `myimage.${ext}`);
    formData.append('name', name);

    console.log(formData)
    //return this.httpClient.post(`${this.url}/image`, formData);
  }

  uploadImageFile(file: File) {
    const ext = file.name.split('.').pop();
    const formData = new FormData();
    formData.append('file', file, `myimage.${ext}`);
    formData.append('name', file.name);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      //base64
        //console.log(reader.result);
    };
    //console.log(file)
    //return this.httpClient.post(`${this.url}/image`, formData);
  }

  obtenerPublicacionPorId(id: string): Promise<p>{
      const url = `${this.baseUrl}publicacionComentario/${id}`;
      return this.httpClient.get<p>(url).toPromise();
  }
  
  reaccionar(reaccion: Reaccion){
    return this.httpClient.post(this.baseUrl+"publicacionComentario/publicacion/reaccionar", reaccion).subscribe({
      error: error => {
          console.log(error);
      }
  });

  }

}
