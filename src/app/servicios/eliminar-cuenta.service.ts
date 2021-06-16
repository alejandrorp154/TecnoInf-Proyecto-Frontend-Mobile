import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EliminarCuentaService {

  constructor(@Inject('BASE_URL') private baseUrl: string, private httpClient: HttpClient) { }


  deleteAcount(userID: string)
  {
    try {
      const url = `${this.baseUrl}usuario/${userID}`;
      return this.httpClient.delete(url).toPromise()
    } catch (error) {
      console.log(error);
    }
  }
}
