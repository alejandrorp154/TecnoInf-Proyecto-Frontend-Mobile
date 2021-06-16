import { Usuario } from '../modelos/usuario.model';

export class Medalla {
  constructor (
    public idMedalla: number,
    public cantidadPuntos: number,
    public logros: string,
    public rango: string,
    public usuario: Usuario
  ){ }
}
