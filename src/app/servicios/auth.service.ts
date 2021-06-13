import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, from, Observable} from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UserFire } from '../modelos/userFire.model';
import { Plugins } from '@capacitor/core';
import { Router } from '@angular/router';
import { Usuario } from '../modelos/usuario.model';
import { AuthResponseData } from '../modelos/AuthResponseData.interface';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userFire = new BehaviorSubject<UserFire>(null);

  get userIsAuthenticated()
  {
    return this._userFire.asObservable().pipe(
      map(userFire => {
        if(userFire)
        {
          return !!userFire.token;
        }
        else
        {
          return false
        }
      })
    );
  }

  get token() {
    return this._userFire.asObservable().pipe(
      map(user => {
        if (user) {
          return user.token;
        } else {
          return null;
        }
      })
    );
  }

  get userID()
  {
    return this._userFire.asObservable().pipe(map(userFire =>
      {
        if(userFire)
        {
          return userFire.id;
        }
        else
        {
          return null;
        }
      })
    );
  }

  constructor(private http: HttpClient, private router: Router) { }

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
        const userFire = new UserFire(
          parsedData.userId,
          parsedData.email,
          parsedData.token,
          expirationTime
        );
        return userFire;
      }),
      tap(userFire => {
        if (userFire) {
          this._userFire.next(userFire);
          //this.autoLogout(userFire.tokenDuration);
        }
      }),
      map(userFire => {
        return !!userFire;
      })
    );
  }

  signup(email: string, password: string)
  {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseConfig.apiKey}`,
      {email: email, password: password, returnSecureToken: true}
      ).pipe(tap(this.setUserFireData.bind(this)));
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${
          environment.firebaseConfig.apiKey
        }`,
        { email: email, password: password, returnSecureToken: true }
      ).pipe(tap(this.setUserFireData.bind(this)));
  }

  logout()
  {
    this._userFire.next(null);
    Plugins.Storage.remove({ key: 'authData' });
    this.router.navigateByUrl('/login');
  }

  deleteAccount(userID: string)
  {
    try {
      return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${
        environment.firebaseConfig.apiKey
      }`, {idToken: userID})
    } catch (error) {
      console.log(error)
    }
  }

  restorePassword()
  {

  }

  private setUserFireData(userFireData: AuthResponseData)
  {
    const expirationTime = new Date(
      new Date().getTime() + (+userFireData.expiresIn * 1000))
      ;

    const userFire = new UserFire(
      userFireData.localId,
      userFireData.email,
      userFireData.idToken,
      expirationTime
    );
    this._userFire.next(userFire);
    this.storeAuthData(
      userFireData.localId,
      userFireData.idToken,
      expirationTime.toISOString(),
      userFireData.email
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

  public getCurrentUserFire(): Observable<UserFire> {
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
        const userFire = new UserFire(
          parsedData.userId,
          parsedData.email,
          parsedData.token,
          expirationTime
        );
        return userFire;
      })
    );
  }

  public getCurrentUser(): Observable<Usuario> {
    return from(Plugins.Storage.get({ key: 'currentUser' })).pipe(
      map(storedData => {
        if (!storedData || !storedData.value) {
          return null;
        }
        const parsedData = JSON.parse(storedData.value) as {
          idPersona: string,
          nickname: string,
          nombre: string,
          apellido: string,
          celular: string,
          direccion: string,
          email: string,
          pais: string,
          imagenPerfil: string,
          nombreImagen: string,
          extension: string,
          administrador: boolean
        };
        const user = new Usuario(
          parsedData.idPersona,
          parsedData.nickname,
          parsedData.nombre,
          parsedData.apellido,
          parsedData.celular,
          parsedData.direccion,
          parsedData.email,
          parsedData.pais,
          parsedData.imagenPerfil,
          parsedData.nombreImagen,
          parsedData.extension,
          parsedData.administrador
        );
        return user;
      })
    );
  }


}
