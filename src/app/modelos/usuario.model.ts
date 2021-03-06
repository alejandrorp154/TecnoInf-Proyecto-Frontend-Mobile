import { Medalla } from '../modelos/medalla.model';

export class Usuario {
  constructor (
    public idPersona: string,
    public nickname: string,
    public nombre: string,
    public apellido: string,
    public celular: string,
    public direccion: string,
    public email: string,
    public pais: string,
    public imagenPerfil: string,
    public nombreImagen: string,
    public extension: string,
    public administrador?: boolean,
    public medalla?: Medalla,
    public estaBloqueado?: boolean
  ){ }
}

