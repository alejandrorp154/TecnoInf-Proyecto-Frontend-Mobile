import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecuperarPasswordService {

  constructor(private http: HttpClient) { }

  recuperarPassword(email: string)
  {
    return this.http.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${environment.firebaseConfig.apiKey}`,
      {email: email, requestType: "PASSWORD_RESET"})
  }
}
