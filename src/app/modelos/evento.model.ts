import { Persona } from "./persona.model";
import { Publicacion } from "./publicacion.model";

export class Evento {
  idEvento: number;
  ubicacion: string;
  descripcion: string;
  fechaInicio: Date;
  fechaFin: Date;
  estado: string;
  idPersona: string;

  participantes: Persona[];
  publicaciones: Publicacion[];

  constructor(idEvento: number, ubicacion: string, descripcion: string,
    fechaInicio: Date, fechaFin: Date, estado: string, idPersona: string) {
      this.idEvento = idEvento;
      this.ubicacion = ubicacion;
      this.descripcion = descripcion;
      this.fechaInicio = fechaInicio;
      this.fechaFin = fechaFin;
      this.estado = estado;
      this.idPersona = idPersona;
  }
}
