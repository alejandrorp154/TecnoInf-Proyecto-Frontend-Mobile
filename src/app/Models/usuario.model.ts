export class Usuario {
  constructor (
      public uid: string,
      public nickname: string,
      public passphrase: string,
      public nombre: string,
      public apellido: string,
      public email: string,
      public sexo: string,
      public rol: Rol,
      public imgurl: string,
      public bloqueado: boolean

  ){ }

}

export enum Rol { Administrador, Turista }
