import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsuarioAdmin } from '../modelos/usuarioAdmin.model';

@Injectable({
  providedIn: 'root'
})
export class ModAdministradorService {

  constructor(@Inject('BASE_URL') private baseUrl: string, private http: HttpClient) { }

  changeEmail(idToken: string, email:string)
  {
    return this.http.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${environment.firebaseConfig.apiKey}`,
      {idToken: idToken, email: email, returnSecureToken: true})
  }

  callBackend(usuarioAdmin: UsuarioAdmin)
  {
    try {
      const url = `${this.baseUrl}usuario/modificarAdministrador`;
      let response = this.http.put(url, usuarioAdmin).toPromise()
    } catch (error) {
      console.log(error);
    }
  }
}
