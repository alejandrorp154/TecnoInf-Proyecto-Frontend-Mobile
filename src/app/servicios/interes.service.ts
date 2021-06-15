import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Interes } from '../Models/interes.model';


@Injectable({
  providedIn: 'root'
})
export class InteresService {

  private baseUrl = 'http://18.217.108.158:8080/pryectoBack-web/rest';

  constructor(public httpClient: HttpClient) { }

  public getAllInteresesAsync(): Promise<Interes[]> {
    try {
      const url = `${this.baseUrl}/interes/0/5000`;
      return this.httpClient.get<Interes[]>(url).toPromise();

    } catch (error) {
      console.log(error);
    }
  }

  addInteres(interes: string): Promise<Interes> {
    const newInteres = new Interes();
    newInteres.interes= interes;

    const url = `${this.baseUrl}/interes`;
    return this.httpClient.post<Interes>(url, newInteres).toPromise();
  }

  deleteInteres(idInteres: number){
    const url = `${this.baseUrl}/interes/${idInteres}`;
    return this.httpClient.delete(url).toPromise();
  }

  modifyInteres(idInteres: number, interesNuevo: string): Promise<Interes>{
    const modInteres = new Interes();
    modInteres.idInteres = idInteres;
    modInteres.interes = interesNuevo;
    modInteres.perfiles = [];

    const url = `${this.baseUrl}/interes`;
    return this.httpClient.put<Interes>(url, modInteres).toPromise();
  }

}
