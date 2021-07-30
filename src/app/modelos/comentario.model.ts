export class Comentario {
  idComentario: string;
  contenido: string;
  fecha: Date;
  idPublicacion: number;
  idPersona: string;
  idComentarioPadre: string;
  nickname: string;
}

export class comentarioReacciones {
  idComentario: string;
  contenido: string;
  fecha: Date;
  idPublicacion: number;
  idComentarioPadre: string;
  idPersona: string;
  comentariosHijos: comentarioReacciones[];
  cantidadLikes: number;
  cantidadDislikes: number;
  document: document;
  nickname: string;
}

export class document{
  idPublicacion: number;
  idComentarioPadre: string;
  idPersona: string;
  contenido: string;
  fecha: Date;
}
/*

{
    "idComentarioReaccion":"Test",
    "contenido":"Contenido de prueba 2",
    "fecha": "2020-03-10", 
    "idPublicacion": 1,
    "idPersona": 1,
    "idComentarioPadre":"60b2a6ca83ea7a7211e52a01"           
}

  comentarioReacciones": [
        {
            "idComentario": "60d52b8a37c8f162ee9aa6fe",
            "contenido": "Contenido de prueba 13 comentario padre de un padre",
            "fecha": 1583798400000,
            "idPublicacion": 0,
            "idComentarioPadre": null,
            "idPersona": "Q9EMeqRYP8MtvueQTAXrW2jaPR83",
            "comentariosHijos": [],
            "cantidadLikes": 0,
            "cantidadDislikes": 0,
            "document": {
                "idPublicacion": 0,
                "idComentarioPadre": null,
                "idPersona": "Q9EMeqRYP8MtvueQTAXrW2jaPR83",
                "contenido": "Contenido de prueba 13 comentario padre de un padre",
                "fecha": 1583798400000
            }
        },

*/
