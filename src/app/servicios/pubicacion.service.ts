import { HttpClient } from '@angular/common/http';
import { ErrorHandler, Inject, Injectable } from '@angular/core';
import { Publicacion, Reaccion } from '../modelos/publicacion.model';

@Injectable({
  providedIn: 'root'
})
export class PubicacionService {



  constructor(public httpClient: HttpClient, public handleError: ErrorHandler, @Inject('BASE_URL') private baseUrl: string) { }

  altaPublicacion(publicacion: Publicacion){
    return this.httpClient.post(this.baseUrl+"publicacionComentario", publicacion).subscribe({
      error: error => {
          console.log(error);
      }
  });
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

  reaccionar(reaccion: Reaccion){
    return this.httpClient.post(this.baseUrl+"publicacionComentario/publicacion/reaccionar", reaccion).subscribe({
      error: error => {
          console.log(error);
      }
  });
  }

}
