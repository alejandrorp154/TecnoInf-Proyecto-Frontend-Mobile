import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, from} from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Persona } from '../clases/persona.model';
import { Plugins } from '@capacitor/core';


export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _persona = new BehaviorSubject<Persona>(null);

  get userIsAuthenticated()
  {
    return this._persona.asObservable().pipe(
      map(persona => {
        if(persona)
        {
          return !!persona.token;
        }
        else
        {
          return false
        }
      })
    );
  }

  get userID()
  {
    return this._persona.asObservable().pipe(map(persona =>
      {
        if(persona)
        {
          return persona.id;
        }
        else
        {
          return null;
        }
      })
    );
  }

  constructor(private http: HttpClient) { }

  autoLogin() {
    return from(Plugins.Storage.get({ key: 'authData' })).pipe(
      map(storedData => {
        if (!storedData || !storedData.value) {
          return null;
        }
        const parsedData = JSON.parse(storedData.value) as {
          token: string;
          tokenExpirationDate: string;
          userId: string;
          email: string;
        };
        const expirationTime = new Date(parsedData.tokenExpirationDate);
        if (expirationTime <= new Date()) {
          return null;
        }
        const persona = new Persona(
          parsedData.userId,
          parsedData.email,
          parsedData.token,
          expirationTime
        );
        return persona;
      }),
      tap(persona => {
        if (persona) {
          this._persona.next(persona);
          //this.autoLogout(persona.tokenDuration);
        }
      }),
      map(user => {
        return !!user;
      })
    );
  }

  signup(email: string, password: string)
  {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
      {email: email, password: password, returnSecureToken: true}
      ).pipe(tap(this.setPersonaData.bind(this)));
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${
          environment.firebaseAPIKey
        }`,
        { email: email, password: password, returnSecureToken: true }
      ).pipe(tap(this.setPersonaData.bind(this)));
  }

  logout()
  {
    this._persona.next(null);
    Plugins.Storage.remove({ key: 'authData' });
  }

  private setPersonaData(personaData: AuthResponseData)
  {
    const expirationTime = new Date(
      new Date().getTime() + (+personaData.expiresIn * 1000))
      ;

    const persona = new Persona(
      personaData.localId,
      personaData.email,
      personaData.idToken,
      expirationTime
    );
    this.storeAuthData(
      personaData.localId,
      personaData.idToken,
      expirationTime.toISOString(),
      personaData.email
    );
  }

  private storeAuthData(userID: string, token: string, tokenExpirationDate: string, email: string)
  {
    const data = JSON.stringify({
      userId: userID,
      token: token,
      tokenExpirationDate: tokenExpirationDate,
      email: email
    });
    Plugins.Storage.set({ key: 'authData', value: data });
  }
  //Para conseguir el UserID en otros lados
  /*
    this.authService.userID.pipe(take(1)).subscribe(userID =>
      {
        if(!userID)
        {
          throw new Error('No se encontro la ID del usuario.');
        }
        else
        {
           usar userID
        }
      })
  */

}
