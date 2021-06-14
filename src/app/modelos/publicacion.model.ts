export class Publicacion {
  constructor(
    //public idPublicacion: number,
    //public fecha: Date,
    public tipo: TipoPublicacion,
    public contenido: string,
    public nombre: string,//SOLO SE CARGA SI ES FOTO
    public extension: string, //IDEM NOMBRE
    public perfil: usuario
  ){}
}

export class TipoPublicacion{
  public tipo : TipoPublicacionEnum;
}

export enum TipoPublicacionEnum {
  texto = 'texto',
  mapa = 'mapa',
  foto = 'foto',
  enlaceExterno = 'enlaceExterno'
}

export class usuario {
  public usuario: idPersona;
}

export class idPersona {
  public idPersona: string;
}