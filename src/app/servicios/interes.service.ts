import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class Interes {
  idInteres: string;
  interes: string;
}

@Injectable({
  providedIn: 'root'
})
export class InteresService {

  private intereses: Interes[] = [
    {
    idInteres: 'i1',
    interes: 'Nadar'
    },
    {
    idInteres: 'i2',
    interes: 'Correr'
    },
    {
    idInteres: 'i3',
    interes: 'Conducir'
    }
  ]

  private baseUrl = 'http://localhost:8080/pryectoBack-web/rest';

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

  getAllIntereses(){
    return [...this.intereses];
  }

  getInteres(idInteres: string){
    return {...this.intereses.find(interes => {
      return interes.idInteres === idInteres
    })};
  }

  addInteres(interes: string){
    const newInteres = new Interes();
    newInteres.idInteres = "i"+this.intereses.length+1;
    newInteres.interes = interes;
    //hacer el http put
    this.intereses.push(newInteres);
  }

  deleteInteres(idInteres: string){
    this.intereses = this.intereses.filter(interes => {
      return interes.idInteres !== idInteres;
    })
  }

  modifyInteres(idInteres: string, interesNuevo: string){
    //hacer el http update
    var objIndex = this.intereses.findIndex((inte => inte.idInteres == idInteres));
    this.intereses[objIndex].interes = interesNuevo
  }

}
