import { Inject, Injectable } from '@angular/core';
import { Usuario } from '../modelos/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Plugins } from '@capacitor/core';
import { UsuarioAdmin } from '../modelos/usuarioAdmin.model';

@Injectable({
  providedIn: 'root'
})
export class IniciarSesionService {

  constructor(@Inject('BASE_URL') private baseUrl: string, private httpClient: HttpClient) { }


  getLoguedUser(userID: string): Promise<Usuario>
  {
    try {
      const url = `${this.baseUrl}usuario/${userID}`;
      return this.httpClient.get<Usuario>(url).toPromise()
    } catch (error) {
      console.log(error);
    }
  }

  storeUserData(userData: Usuario)
  {
    const data = JSON.stringify({
      idPersona: userData.idPersona,
      nickname: userData.nickname,
      nombre: userData.nombre,
      apellido: userData.apellido,
      celular: userData.celular,
      direccion: userData.direccion,
      email: userData.email,
      pais: userData.pais,
      administrador: userData.administrador,
      imagenPerfil: userData.imagenPerfil,
      nombreImagen: userData.nombreImagen,
      extension: userData.extension
    });
    Plugins.Storage.set({ key: 'currentUser', value: data });
  }


}
