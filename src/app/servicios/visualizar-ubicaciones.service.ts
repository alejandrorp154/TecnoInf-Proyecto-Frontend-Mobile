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

  constructor(private authService: AuthService, private httpClient: HttpClient) {
  }

  public getAllUbicacionesAsync(userID: string): Promise<Ubicacion[]> {
    try {
      const url = `${this.baseUrl}/ubicacion/${userID}`;
      return this.httpClient.get<Ubicacion[]>(url).toPromise();

    } catch (error) {
      console.log(error);
    }
  }

}
