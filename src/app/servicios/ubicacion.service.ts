import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Ubicacion } from '../modelos/ubicacion';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {

  constructor(public httpClient: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  altaUbicacion(ubicacion: Ubicacion){
    return this.httpClient.post(this.baseUrl+"ubicacion", ubicacion).subscribe({
      error: error => {
          console.log(error);
      }
  });
  }
}
