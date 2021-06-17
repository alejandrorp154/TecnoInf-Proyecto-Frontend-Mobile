import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Interes } from '../modelos/interes.model';


@Injectable({
  providedIn: 'root'
})
export class InteresService {

  constructor(public httpClient: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  public getAllInteresesAsync(): Promise<Interes[]> {
    try {
      const url = `${this.baseUrl}interes/0/5000`;
      return this.httpClient.get<Interes[]>(url).toPromise();

    } catch (error) {
      console.log(error);
    }
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
    return this.httpClient.delete(url).toPromise();
  }
  unSubscribeInteres(idInteres: Number, userID: string)
  {
    const url = `${this.baseUrl}interes/desuscribe/${userID}/${idInteres}`;
    return this.httpClient.delete(url).toPromise();
  }

}
