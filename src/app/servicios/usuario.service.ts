import { Injectable } from '@angular/core';
import { Usuario } from '../modelos/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor() { }

  public getCurrentUser() {}

  public obtenerContactos(): Usuario[] {
    return [];
  }
}
