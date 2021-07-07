import { Usuario } from "./usuario.model";

export class Perfil {
    usuario: Usuario;
    intereses: [];
    galerias: [];
    publicaciones?: Publicacion[];
}

export class Publicacion {
    idPublicacion: number;
    contenido: string;
    fecha: Date;
    tipo: {
        idPublicacion: number;
        tipo: string;
    };
    idPersona: string;
    extension: string;
    nombre: string;
    comentarioReacciones: [];
    evento: boolean;
    perfil: boolean;
    cantidadLikes: number;
    cantidadDislikes: number;
}

export class UsuarioPerfil{
    idPersona: string;
    nickname: string;
    nombre: string;
    apellido: string;
    celular: string;
    direccion: string;
    email: string;
    pais: string;
    imagenPerfil: string;
    nombreImagen: string;
    extensionImagen: string;
}

export class PublicacionPerfilUsuario {
    idPublicacion: number;
    contenido: string;
    fecha: Date;
    tipo: {
        idPublicacion: number;
        tipo: string;
    };
    extension: string;
    nombre: string;
    comentarioReacciones: [];
    evento: boolean;
    perfil: boolean;
    cantidadLikes: number;
    cantidadDislikes: number;
    cantidadComentarios: number;
    idPersona: string;
    email: string;
    nickname: string;
    imagenPerfil: string;
    extensionImagenPerfil: string;
    nombreImagenPerfil: string;
}
