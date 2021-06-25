import { Configuracion } from "./../modelos/configuracion.model";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { getBaseUrl } from "../app.module";
import { CompilerConfig } from "@angular/compiler";

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionesService {

  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private httpClient: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  configuraciones: Configuracion;

  async configurarNotificaciones(config: Configuracion){
    try{
      let postData = {
        "idConfiguracion" : config.idConfiguracion,
	      "altaPublicacion" : config.altaPublicacion,
	      "altaContacto" : config.altaContacto,
	      "reaccionPublicacion" : config.reaccionPublicacion,
	      "comentarPublicacion" : config.comentarPublicacion,
	      "altaEvento" : config.altaEvento,
	      "invitacionUsuario" : config.invitacionUsuario,
	      "salirEvento" : config.salirEvento,
	      "recuperarContrasenia" : config.recuperarContrasenia,
	      "bloquearUsuario" : config.bloquearUsuario,
	      "desbloquearUsuario" : config.desbloquearUsuario,
	      "chatUsuario" : config.chatUsuario,
	      "bajaEvento" : config.bajaEvento,
	      "modificacionEvento" : config.modificacionEvento,
        "isEmailNotification": true,
        "idPersona" : config.idPersona,
      }
      const url = `${this.baseUrl}configSistema`;
      console.log('CONFIG EN SERVICE', config);
      let response = this.httpClient.put<Configuracion>(url, postData);
      console.log('RESPONSE',response.toPromise());
    }catch(error){
      console.log(error);
    }
  }

  async configurarNotificacionesPUSH(config: Configuracion){
    try{
      let postData = {
        "idConfiguracion" : config.idConfiguracion,
	      "altaPublicacion" : config.altaPublicacion,
	      "altaContacto" : config.altaContacto,
	      "reaccionPublicacion" : config.reaccionPublicacion,
	      "comentarPublicacion" : config.comentarPublicacion,
	      "altaEvento" : config.altaEvento,
	      "invitacionUsuario" : config.invitacionUsuario,
	      "salirEvento" : config.salirEvento,
	      "recuperarContrasenia" : config.recuperarContrasenia,
	      "bloquearUsuario" : config.bloquearUsuario,
	      "desbloquearUsuario" : config.desbloquearUsuario,
	      "chatUsuario" : config.chatUsuario,
	      "bajaEvento" : config.bajaEvento,
	      "modificacionEvento" : config.modificacionEvento,
        "isEmailNotification": false,
        "idPersona" : config.idPersona,
      }
      const url = `${this.baseUrl}configSistema/push`;
      console.log('CONFIG EN SERVICE', config);
      let response = this.httpClient.put<Configuracion>(url, postData);
      console.log('RESPONSE',response.toPromise());
    }catch(error){
      console.log(error);
    }
  }

  async getConfiguraciones(idPersona: string){
    try{
      const url = `${this.baseUrl}configSistema/${idPersona}`;
      let response = await this.httpClient.get(url).toPromise();
      this.configuraciones = response as Configuracion;
      console.log(response);
      return this.configuraciones;
    }catch(error){
      console.log(error);
    }
  }

  async getConfiguracionesPUSH(idPersona: string){
    try{
      const url = `${this.baseUrl}configSistema/push/${idPersona}`;
      let response = await this.httpClient.get(url).toPromise();
      this.configuraciones = response as Configuracion;
      console.log(response);
      return this.configuraciones;
    }catch(error){
      console.log(error);
    }
  }
}
