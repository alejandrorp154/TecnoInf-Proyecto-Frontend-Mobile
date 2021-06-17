import { Usuario } from "../modelos/usuario.model";

export class Medalla {
  idMedalla: number;
  cantidadPuntos: number;
  logros: string;
  rango: rangos;
  usuario: Usuario
}
export enum Logros {
  Publicaciones
}
export enum rangos {
	ironWolf,
	bronzeWolf,
	silverWolf,
	goldWolf,
	platinumWolf,
	diamondWolf,
	masterWolf,
	alfaWolf
}
