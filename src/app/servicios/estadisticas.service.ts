import { UsuarioService } from './usuario.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {


  constructor(private userService: UsuarioService) { }

}
