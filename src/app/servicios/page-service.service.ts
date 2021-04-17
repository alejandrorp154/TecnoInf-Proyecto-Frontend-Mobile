import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../clases/usuario';

@Injectable({
  providedIn: 'root'
})
export class PageServiceService {

  private baseUrl = 'http://localhost:8080';

  constructor(public httpClient: HttpClient) { }

  public async getAllUsersAsync(offset:number, size:number): Promise<any[]> {
    try {
      const url = `${this.baseUrl}/usuario/${offset}/${size}`;
      let response = await this.httpClient.get(url).toPromise();
      return response as Usuario[];
    } catch (error) {
      console.log(error);
      //await this.handleError(error);
    }
  }

}
