import { estadosContactos } from "./estadosContactos.enum";
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
  // facilita la comparación con idPersona
  owner: boolean;
  solicitud: estadosContactos


  participantes?: Persona[];
  publicaciones?: Publicacion[];
}
