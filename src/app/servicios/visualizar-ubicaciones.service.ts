import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { Ubicacion } from '../modelos/ubicacion.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class VisualizarUbicacionesService {

  private baseUrl = 'http://18.217.108.158:8080/pryectoBack-web/rest';
  private userID;

  constructor(private authService: AuthService, private httpClient: HttpClient) {
    this.getUserID();
  }

  public getAllInteresesAsync(): Promise<Ubicacion[]> {
    try {
      const url = `${this.baseUrl}/ubicacion/${this.userID}`;
      return this.httpClient.get<Ubicacion[]>(url).toPromise();

    } catch (error) {
      console.log(error);
    }
  }

  public getUserID(){
    this.authService.userID.pipe(take(1)).subscribe(userID =>
      {
        console.log(userID);
        if(!userID)
        {
          throw new Error('No se encontro la ID del usuario.');
        }
        else
        {
           this.userID = userID;
        }
      })
  }
  

}
