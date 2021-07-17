import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../modelos/evento.model';
import { AuthService } from './auth.service';
import { ChatService } from './chat.service';
import { idPersona } from '../modelos/publicacion.model';
import { PublicacionPerfilUsuario } from '../modelos/perfil';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  public eventoActual: Evento;

  currentlyLoaded: number = 0;

  constructor(private authService: AuthService, private chatService: ChatService, public http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
  }

  async obtenerEvento(idEvento: number): Promise<Evento> {
    console.log('Ingresó a obtenerEvento(idEvento)');
    let res = await this.http.get<Evento>(this.baseUrl + 'evento/obtenerEvento/' + idEvento).toPromise();
    let evento: Evento = {
      idEvento: res.idEvento,
      nombre: res.nombre,
      ubicacion: res.ubicacion,
      descripcion: res.descripcion,
      fechaInicio: res.fechaInicio,
      fechaFin: res.fechaFin,
      estado: res.estado,
      idPersona: res.idPersona,
      nombreImagen: res.nombreImagen,
      imagen: res.imagen,
      extension: res.extension,
      idChat: res.idChat,
      // facilita la comparación con idPersona
      owner: res.owner,
      solicitud: res.solicitud,


      invitados: res.invitados
    }
    return new Promise((resolve) => resolve(evento));
  }

  obtenerEventosXPersona(idPersona: string): Promise<Evento[]> {
    console.log('Ingresó a obtenerEventosXPersona(idPersona)');
   /* return new Promise((resolve) => resolve([
      { idEvento: 1, nombre: 'Evento 1', ubicacion: '-34.8833|-58.1667', descripcion: 'Evento 1 de prueba', fechaInicio: new Date(), fechaFin: new Date(),
        estado: 'Pendiente', idPersona: '0V635VCDkeYlW5er6SvVSG5UbVD2', participantes: [], publicaciones: [], nombreImagen: '', extension: '', imagen: ''  },
      { idEvento: 2, nombre: 'Evento 2', ubicacion: '-34.8833|-58.1667', descripcion: 'Evento 2 de prueba', fechaInicio: new Date(), fechaFin: new Date(),
        estado: 'Pendiente', idPersona: '0V635VCDkeYlW5er6SvVSG5UbVD2', participantes: [], publicaciones: [], nombreImagen: '', extension: '', imagen: '' },
    ]));*/
    // return this.http.get<Evento[]>(this.baseUrl + 'eventos/' + idPersona).toPromise();
    return this.http.get<Evento[]>(this.baseUrl + 'evento/obtenerEventos/' + idPersona + '/0/10').toPromise();
  }

  removerParticipante(idPersona: string, idEvento:number)
  {
    return this.http.delete<boolean>(this.baseUrl + `evento/removerUsuario/${idEvento}/${idPersona}`).toPromise();
  }

  responderSolicitud(idPersona: string, idEvento: number, respuesta: string) {
    console.log({idEvento: idEvento, idPersona: idPersona, estadoContactos: respuesta});
    return this.http.put<boolean>(this.baseUrl + 'evento/responderIvitacion', {"idEvento": idEvento, "idPersona": idPersona, "estadoContactos": respuesta}).toPromise();
  }

  async crearEvento(evento: Evento): Promise<Evento> {
    console.log(evento.invitados);
    let invitados: string[] = evento.invitados.map(i => i.idPersona);
    console.log(invitados);
    evento.invitados = undefined;
    console.log('********************************************');
    console.log('quiere crear', evento);
    console.log('********************************************');
    let loggedUser = await this.authService.getCurrentUserFire().toPromise();
    evento.idPersona = loggedUser.id;
    console.log(loggedUser, evento);
    let idChat = await this.chatService.crearChat(invitados, evento.nombre);
    console.log(idChat);
    console.log('Ingresó a crearEvento(evento)', evento);
    evento.idChat = idChat;
    await this.http.post<any>(this.baseUrl + 'evento', evento).toPromise().then(res => {
      evento = res;
      console.log(evento);
      invitados.forEach(i => this.invitar(evento.idEvento, loggedUser.id, i));
    }).catch(ex => console.log(ex));
    return new Promise(resolve => resolve(evento));
  }

  modificarEvento(evento: Evento, invitados: string[]): Promise<Evento> {
    console.log(invitados, evento.invitados);
    invitados.forEach(i => {
      console.log(typeof(i), evento.invitados.map(i => i.idPersona), evento.invitados.some(u => u.idPersona == i));
      if(!evento.invitados.some(u => u.idPersona == i)){
        console.log(i);
        this.invitar(evento.idEvento, evento.idPersona, i);
      }
    });
    return this.http.put<any>(this.baseUrl + 'evento', <Evento>{
      idEvento: evento.idEvento,
      nombre: evento.nombre,
      ubicacion: evento.ubicacion,
      descripcion: evento.descripcion,
      fechaInicio: evento.fechaInicio,
      fechaFin: evento.fechaFin,
      estado: evento.estado,
      idPersona: evento.idPersona,
      nombreImagen: evento.nombreImagen,
      imagen: evento.imagen,
      extension: evento.extension,
      idChat: evento.idChat,
      owner: evento.owner
    }).toPromise();
  }

  invitar(idEvento: number, idOwner: string, idInvitado: string) {
    console.log(this.baseUrl + `evento/invitar/${idEvento}/${idInvitado}/${idOwner}`);
    this.http.post<boolean>(this.baseUrl + `evento/invitar/${idEvento}/${idInvitado}/${idOwner}`, null).toPromise().then(res =>
      console.log(res));
  }

  async dejarEvento(idEvento:number)
  {
    let userFire = await this.authService.getCurrentUserFire().toPromise();
    this.http.delete<boolean>(this.baseUrl + `evento/dejar/${idEvento}/${userFire.id}`).toPromise();
  }

  async elminarEvento(idEvento: number): Promise<boolean> {
    let userFire = await this.authService.getCurrentUserFire().toPromise();
    console.log('Ingresó a eliminarEvento(idEvento)', idEvento);
    return this.http.delete<boolean>(this.baseUrl + 'evento/' + idEvento + '/' + userFire.id).toPromise();
  }

  obtenerPublicaciones(idEvento: string, size: number, event?): Promise<PublicacionPerfilUsuario[]>{
    let response = this.http.get<PublicacionPerfilUsuario[]>(this.baseUrl + 'publicacionComentario/publicacionEvento/' + idEvento+'/' + this.currentlyLoaded+'/'+size).toPromise();
    if(this.currentlyLoaded === 0){ this.currentlyLoaded += size}
    if(event)
    {
      event.target.complete();
      this.currentlyLoaded += size;
      response.then( data => {
        if (data.length == 0) {
          event.target.disabled = true;
        }
      })
    }
    return response;
  }

}
