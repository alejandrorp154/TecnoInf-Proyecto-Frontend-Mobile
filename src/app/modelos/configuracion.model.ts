export class Configuracion {

  constructor(
    public idPersona: string,
    public idConfiguracion: number,
    public altaPublicacion: boolean,
    public altaContacto: boolean,
    public reaccionPublicacion: boolean,
    public comentarPublicacion: boolean,
    public altaEvento: boolean,
    public invitacionUsuario: boolean,
    public salirEvento: boolean,
    public recuperarContrasenia: boolean,
    public bloquearUsuario: boolean,
    public desbloquearUsuario: boolean,
    public chatUsuario: boolean,
    public bajaEvento: boolean,
    public modificacionEvento: boolean,
    public isEmailNotification: boolean

  ){}

}
