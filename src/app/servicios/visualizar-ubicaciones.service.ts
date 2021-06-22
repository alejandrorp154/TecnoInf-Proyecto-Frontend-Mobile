import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { Ubicacion } from '../modelos/ubicacion.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class VisualizarUbicacionesService {


  constructor(private authService: AuthService, private httpClient: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
  }

  public getAllUbicacionesAsync(userID: string): Promise<Ubicacion[]> {
    try {
      const url = `${this.baseUrl}ubicacion/${userID}`;
      return this.httpClient.get<Ubicacion[]>(url).toPromise();

    } catch (error) {
      console.log(error);
    }
  }

}
