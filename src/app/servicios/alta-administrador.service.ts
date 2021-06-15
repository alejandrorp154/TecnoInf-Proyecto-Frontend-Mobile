import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponseData } from '../modelos/AuthResponseData.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AltaAdministradorService {

  constructor(private http: HttpClient) { }

  signup(email: string, password: string)
  {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseConfig.apiKey}`,
      {email: email, password: password, returnSecureToken: true})
  }

}
