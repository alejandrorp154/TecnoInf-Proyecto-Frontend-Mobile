export class Perfil {
    usuario: Usuario;
    intereses: [];
    galerias: [];
    publicaciones?: Publicacion[];
}

class Usuario {
    idPersona: string;
    email: string;
    nombre: string;
    apellido: string;
    nickname: string;
    direccion: string;
    celular: string;
    medalla: Medalla;
}

class Medalla {
    idMedalla: number;
    cantidadPuntos: number;
    logros: string;
    rango: string;
    usuario: Usuario
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
}
