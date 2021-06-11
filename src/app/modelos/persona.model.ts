export class Persona {
  idPersona: string;
  nickname: string;
  nombre: string;
  apellido: string;
  sexo?: string;
  celular?: string;
  email: string;
  imgUrl?: string;
  rol: Rol;
  bloqueado?: boolean
}

export enum Rol { Administrador, Turista }
