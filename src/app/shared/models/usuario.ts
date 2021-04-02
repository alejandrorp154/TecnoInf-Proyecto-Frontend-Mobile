export class Usuario {
  usuarioId: number;
  nickname: string;
  passphrase: string;
  nombre: string;
  apellido: string;
  email: string;
  sexo: string;
  rol: Rol;
}

export enum Rol { Administrador, Turista }
