import { Persona } from "./persona.model";
import { Publicacion } from "./publicacion.model";
import { Ubicacion } from "./ubicacion.model";

export class Evento {
  idEvento: number;
  nombre: string;
  ubicacion: Ubicacion;
  descripcion: string;
  fechaInicio: Date;
  fechaFin: Date;
  estado: number;
  idPersona: string;
  nombreImagen: string;
  imagen: string;
  extension: string;
  idChat: string;

  participantes?: Persona[];
  publicaciones?: Publicacion[];

}
