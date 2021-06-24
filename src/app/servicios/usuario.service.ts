import { Multimedia } from "./../modelos/multimedia.model";
import { idPersona } from "./../modelos/publicacion.model";
import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Persona, Rol } from '../modelos/persona.model';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { UserFire } from '../modelos/userFire.model';
import { Usuario } from '../modelos/usuario.model';
import { Contacto, EstadosContactos } from "../modelos/contacto.model";

@Injectable({
  providedIn: 'any'
})
export class UsuarioService {

  readonly estados = {}
  currentlyLoaded: number = 0;

  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods' : 'GET,HEAD,OPTIONS,POST,PUT',
      'Access-Control-Allow-Headers' : 'Origin, X-Requested-With, Content-Type,  Accept, x-client-key, x-client-token, x-client-secret, Authorization'
      //Authorization: 'my-auth-token'
    })
  };

  usuarios: Persona[];
  contactos: Contacto[];

  constructor(private httpClient: HttpClient, private authService: AuthService, @Inject('BASE_URL') private baseUrl: string) { }

   //public async getAllUsuariosAsync(offset: number, size: number): Promise<Usuario[]> {
    public async getAllUsuariosAsync(): Promise<Persona[]> {
      try {
        const url = `${this.baseUrl}visualizacion/obtenerUsuarios/0/10`;
        let response = await this.httpClient.get(url).toPromise();
        this.usuarios = response as Persona[];
        return response as Persona[];
      } catch (error) {
        console.log(error);
      }
    }

  public getAllUsuariosObs(): Observable<Persona[]> {
    try {
      const url = `${this.baseUrl}visualizacion/obtenerUsuarios/0/10`;
      return this.httpClient.get<Persona[]>(url);
    } catch (error) {
      console.log(error);
    }
  }

  public getAllUsuariosRegistradosAsync(): Promise<Usuario[]> {
    try {
      const url = `${this.baseUrl}visualizacion/obtenerUsuarios/0/5000`;
      return this.httpClient.get<Usuario[]>(url).toPromise();

    } catch (error) {
      console.log(error);
    }
  }

  getAllUsuarios(){
    return [...this.usuarios];
  }

  getUsuario(idUsuario: string){
    return {...this.usuarios.find(user => {
      return user.idPersona === idUsuario
    })};
  }

  deleteAcount(userID: string)
  {
    try {
      const url = `${this.baseUrl}usuario/${userID}`;
      return this.httpClient.delete(url).toPromise()
    } catch (error) {
      console.log(error);
    }
  }

  addUsuario(idPersona: string, email: string, nombre: string, apellido: string, nickname: string,
    direccion: string, celular: string, pais: string, imagenPerfil: string, nombreImagen: string, extensionImagen: string){

    const url = `${this.baseUrl}usuario/registrarUsuario/`;
    let postData = {
      "idPersona": idPersona,
      "email": email,
      "nombre": nombre,
      "apellido": apellido,
      "nickname": nickname,
      "direccion": direccion,
      "celular": celular,
      "pais": pais,
      "imagenPerfil": imagenPerfil,
      "nombreImagen": nombreImagen,
      "extensionImagen": extensionImagen
    }
    return this.httpClient.post<Persona>(url, postData, this.httpOptions)
    .subscribe(data => {
      console.log(data['_body']);
     }, error => {
      console.log(error);
    });
  }

  deleteUsuario(idUsuario: string){
    this.usuarios = this.usuarios.filter(user => {
      return user.idPersona !== idUsuario;
    })
  }

  deleteUsuarioAdmin(idUsuario:string)
  {
    const url = `${this.baseUrl}usuario/bajaAdmin/${idUsuario}`;
    this.httpClient.delete(url);
  }

  async bloquearUsuario(idUsuario: string){
    const url = `${this.baseUrl}usuario/bloquearUsuario/${idUsuario}`;
    this.httpClient.put<Usuario>(url, null)
    .subscribe(data => {
      console.log(data['_body']);
     }, error => {
      console.log(error);
    });
  }
  async desbloquearUsuario(idUsuario: string){
    const url = `${this.baseUrl}usuario/desbloquearUsuario/${idUsuario}`;
    this.httpClient.put<Usuario>(url, null)
    .subscribe(data => {
      console.log(data['_body']);
     }, error => {
      console.log(error);
    });
  }

  getContactos(idUsuario: string, size: number, event?): Promise<Usuario[]> {
    let response = this.httpClient.get<Usuario[]>(this.baseUrl + `visualizacion/obtenerAmigos/${idUsuario}/${this.currentlyLoaded}/${size}`).toPromise();
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
  public async getContactosAsync(idPersona: string) {
    try{
      const url = `${this.baseUrl}usuario/obtenerAmigos/${idPersona}/10/10`;
      let response = await this.httpClient.get(url).toPromise();
      this.contactos = response as Contacto[];
      return response as Contacto[];
    }
    catch(error){
      console.log(error)
    }

  }

  getLoggedUser(): Promise<Persona> {
    return new Promise(async (resolve) => {
      let userFire = await this.authService.getCurrentUserFire().toPromise();
      resolve(this.getUsuario(userFire.id));
    });
  }

  getUsuarioAsync(idPersona: string): Promise<Persona> {
    console.log(this.baseUrl + 'usuario/' + idPersona);
    return this.httpClient.get<Persona>(this.baseUrl + 'usuario/' + idPersona).toPromise();
  }

  async agregarContacto(idPersona1: string, idPersona2: string){
    const url = `${this.baseUrl}usuario/solicitudContacto/${idPersona1}/${idPersona2}`;
    this.httpClient.put<Usuario>(url, null)
    .subscribe(data => {
      console.log(data['_body']);
     }, error => {
      console.log(error);
    });
  }

  async respuestaContacto(idPersona: string, idPersonaContacto: string, estado: EstadosContactos){
    let json = {
      "idPersona" : idPersona,
      "contactoIdPersona" : idPersonaContacto,
      "estadoContactos" : estado
    };
    const url = `${this.baseUrl}usuario/respuestaContacto`;
    let response = this.httpClient.post<Contacto>(url, json).toPromise().catch(error => console.log(error));
    return response;
  }

  async subirFoto(mult: Multimedia){
    let json = {
      "contenido" : mult.contenido,
      "nombre" : mult.nombre,
      "extension" : mult.extension,
      "idPersona" : mult.idPersona
    };
    const url = `${this.baseUrl}usuario/subirFoto`;
    let response = this.httpClient.post<Multimedia>(url, json).toPromise().catch(error => console.log(error));
    return response;
  }

  async bajaContacto(idPersona1: string, idPersona2: string){
    const url = `${this.baseUrl}usuario/bajaContacto/${idPersona1}/${idPersona2}`;
    this.httpClient.delete<Usuario>(url)
    .subscribe(data => {
      console.log(data['_body']);
     }, error => {
      console.log(error);
    });
  }

}
