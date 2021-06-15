import { Usuario } from "./usuario.model";

export class Medalla {
  idMedalla: number;
  cantidadPuntos: number;
  logros: string;
  rango: string;
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
