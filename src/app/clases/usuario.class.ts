export class Usuario {
  uid: string;
  nickname: string;
  passphrase: string;
  nombre: string;
  apellido: string;
  email: string;
  sexo: string;
  rol: Rol;
  imgurl: string;
}

export enum Rol { Administrador, Turista }

