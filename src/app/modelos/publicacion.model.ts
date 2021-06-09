export class Publicacion {
  constructor(
    public idPublicacion: number,
    public fecha: Date,
    public tipo: TipoPublicacion

  ){}
}

enum TipoPublicacion {
  texto,
  ubicacion,
  foto
}
