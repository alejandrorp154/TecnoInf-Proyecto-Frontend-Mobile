import { Injectable } from '@angular/core';
import { Persona } from '../modelos/persona.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor() { }

  public getCurrentUser() {
    // ***********************
  }

  public obtenerContactos(): Persona[] {
    //   ***********************
    return [];
  }
}
