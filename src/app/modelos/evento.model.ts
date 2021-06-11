import { Persona } from "./persona.model";
import { Publicacion } from "./publicacion.model";

export class Evento {
  idEvento: number;
  nombre: string;
  ubicacion: string;
  descripcion: string;
  fechaInicio: Date;
  fechaFin: Date;
  estado: string;
  idPersona: string;

  participantes: Persona[];
  publicaciones: Publicacion[];

}
