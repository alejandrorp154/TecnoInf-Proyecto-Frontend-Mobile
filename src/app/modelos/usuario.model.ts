export class Usuario {
  idUsuario: string;
  nickname: string;
  nombre: string;
  apellido: string;
  celular: number;
  email: string;

  constructor (
    idUsuario: string,
    nickname: string,
    nombre: string,
    apellido: string,
    celular: number,
    email: string,
  ){
    this.idUsuario = idUsuario;
    this.nickname = nickname;
    this.nombre = nombre;
    this.apellido = apellido;
    this.celular = celular;
    this.email = email;
   }
}
