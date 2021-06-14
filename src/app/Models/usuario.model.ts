import { Medalla } from './medalla.model';
export class Usuario {
  constructor (
    public idUsuario: string,
    public nickname: string,
    public nombre: string,
    public apellido: string,
    public celular: number,
    public email: string,
    public passphrase: string,
    public sexo: string,
    public rol: Rol,
    public imgurl: string,
    public bloqueado: boolean,
    public pais: string,
    public medalla: Medalla
  ){ }

}

export enum Rol { Administrador, Turista }
