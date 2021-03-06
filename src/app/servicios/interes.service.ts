import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Interes } from '../modelos/interes.model';
import { InteresUsuario } from '../modelos/interesUsuario.model';


@Injectable({
  providedIn: 'root'
})
export class InteresService {

  constructor(public httpClient: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  public getAllInteresesAsync(): Promise<Interes[]> {
    const url = `${this.baseUrl}interes/0/5000`;
    return this.httpClient.get<Interes[]>(url).toPromise();
  }

  getInteresesByUser(userID:string): Promise<InteresUsuario[]>
  {
    const url = `${this.baseUrl}usuario/getInteresByUsuario/${userID}`;
    return this.httpClient.get<InteresUsuario[]>(url).toPromise();
  }

  addInteres(interes: string): Promise<Interes> {
    const newInteres = new Interes();
    newInteres.interes= interes;

    const url = `${this.baseUrl}interes`;
    return this.httpClient.post<Interes>(url, newInteres).toPromise();
  }

  deleteInteres(idInteres: number){
    const url = `${this.baseUrl}interes/${idInteres}`;
    return this.httpClient.delete(url).toPromise();
  }

  modifyInteres(idInteres: number, interesNuevo: string): Promise<Interes>{
    const modInteres = new Interes();
    modInteres.idInteres = idInteres;
    modInteres.interes = interesNuevo;
    modInteres.perfiles = [];

    const url = `${this.baseUrl}interes`;
    return this.httpClient.put<Interes>(url, modInteres).toPromise();
  }

  subscribeInteres(idInteres: Number, userID: string)
  {
    const url = `${this.baseUrl}interes/suscribe/${userID}/${idInteres}`;
    return this.httpClient.post(url, {idPersona: userID, idInteres: idInteres}).toPromise();
  }
  unSubscribeInteres(idInteres: Number, userID: string)
  {
    const url = `${this.baseUrl}interes/desuscribe/${userID}/${idInteres}`;
    return this.httpClient.delete(url).toPromise();
  }

}
