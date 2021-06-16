import { idPersona } from "./publicacion.model";
export class Contacto {

  public idPersona: string;
  public contactoIdPersona: string;
  public fechaContactos: Date;
  public estadoContacto: EstadosContactos;

  constructor(
  //   public idPersona: string,
  // public contactoIdPersona: string,
  // public fechaContactos: Date,
  // public estadoContacto: EstadosContactos
  ){}
}

export enum EstadosContactos{
  pendiente,
  aceptada,
  cancelada,
  borrado
}
