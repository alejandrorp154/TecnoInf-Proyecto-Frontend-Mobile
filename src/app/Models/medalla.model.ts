export class Medalla {
      public idMedalla: number;
      public cantidadPuntos: number;
      public logo: string;
      public logros: string;
      public rango: rangos;

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