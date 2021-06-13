import { Medalla } from '../modelos/medalla.model';

export class Usuario {
    public idPersona: string
    public email: string
    public nombre: string
    public apellido: string
    public nickname: string
    public direccion: string
    public celular: string
    public medallas: Medalla[]
    public pais: string
    public imagenPerfil: string
    public nombreImagen: string
    public extension: string
}
