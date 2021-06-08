import { HttpClient } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Publicacion } from '../Models/publicacion.model';

@Injectable({
  providedIn: 'root'
})
export class PubicacionService {

  private baseUrl = 'http://3.18.102.215:8080/pryectoBack-web/rest';


  constructor(public httpClient: HttpClient, public handleError: ErrorHandler) { }

  altaPublicacion(publicacion: Publicacion){
    return this.httpClient.post(this.baseUrl+"/publicacionComentario", publicacion).subscribe({
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

}
