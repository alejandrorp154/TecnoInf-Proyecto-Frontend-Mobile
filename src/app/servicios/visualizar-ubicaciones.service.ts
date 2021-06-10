import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VisualizarUbicacionesService {

  private baseUrl = 'http://18.217.108.158:8080/pryectoBack-web/rest';

  constructor(public httpClient: HttpClient) { }
}
