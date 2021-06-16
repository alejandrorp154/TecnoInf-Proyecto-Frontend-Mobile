import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BajaContactoService {

  constructor(public httpClient: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  deleteInteres(idUsuario: string, idUsuarioBaja: string){
    const url = `${this.baseUrl}usuario/bajaContacto/${idUsuario}/${idUsuarioBaja}`;
    return this.httpClient.delete(url).toPromise();
  }

}
