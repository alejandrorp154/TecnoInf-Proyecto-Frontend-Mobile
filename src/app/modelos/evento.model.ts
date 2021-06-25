import { estadosContactos } from "./estadosContactos.enum";
import { Usuario } from "./usuario.model";
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
  solicitud: estadosContactos;


  invitados?: Invitado[];
  publicaciones?: Publicacion[];
}

export interface Invitado {
  idPersona: string;
  nickname: string;
  nombre: string;
  apellido: string;
  imagenPerfil: string;
  nombreImagen: string;
  extensionImagen: string;
  estadoContactos: string;
  owner: boolean;
}
