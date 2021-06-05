import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Interes } from '../Models/interes.model';


@Injectable({
  providedIn: 'root'
})
export class InteresService {

  private baseUrl = 'http://3.18.102.215:8080/pryectoBack-web/rest';

  constructor(public httpClient: HttpClient) { }

  public async getAllInteresesAsync(): Promise<Interes[]> {
    try {
      const url = `${this.baseUrl}/interes`;
      let response = await this.httpClient.get(url).toPromise();
      return response as Interes[];
    } catch (error) {
      console.log(error);
    }
  }

  addInteres(interes: string){
    const newInteres = new Interes();
    newInteres.interes= interes;
    //hacer el http put
    
    
    //this.intereses.push(newInteres);
  }

  deleteInteres(idInteres: string){
    /*this.intereses = this.intereses.filter(interes => {
      return interes.idInteres !== idInteres;
    })*/
  }

  modifyInteres(idInteres: string, interesNuevo: string){
    /*//hacer el http update
    var objIndex = this.intereses.findIndex((inte => inte.idInteres == idInteres));
    this.intereses[objIndex].interes = interesNuevo*/
  }

}
