import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Perfil, PublicacionPerfilUsuario, UsuarioPerfil } from '../modelos/perfil';
import { Usuario } from '../modelos/usuario.model';
import { Publicacion } from 'src/app/modelos/perfil';
import { UserFire } from '../modelos/userFire.model';
import { AuthService } from './auth.service';
import { Plugins } from '@capacitor/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  public usuarioDatos: Usuario = null;

  public currentlyLoaded: number = 0;
  userFire: UserFire;
  private header:string;
  private message: string;
  private callBack: boolean;


  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private authService:AuthService, private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
    //const idPersona = this.obtenerUsuarioLogeado();
    //http.get<Usuario>(baseUrl + 'usuario/editarPerfil/' +idPersona).subscribe(res => this.usuarioDatos = res);
  }

   obtenerUsuarioLogeado(){
     let user = {
      email: '',
      token: '',
      tokenExpirationDate: '',
      userId: ''
     }
     user = JSON.parse(localStorage.getItem('_cap_authData'));
     return user.userId;
   }

  obtenerPerfil (idPersona: string): Promise<Perfil>{
    return this.http.get<Perfil>(this.baseUrl + 'visualizacion/perfil/' + idPersona).toPromise();
  }

  modificarPerfil (usuario: UsuarioPerfil){

    this.getUserFire();
    this.callBack = true;
    this.header = "";
    this.message = "";

    this.loadingCtrl
    .create({ keyboardClose: true, message: 'Validando...' })
    .then(loadingEl => {
    let authObs: Observable<any> = this.http.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${environment.firebaseConfig.apiKey}`,
      {idToken: this.userFire.token, email: usuario.email, returnSecureToken: true})

    authObs.subscribe(resData => {
      this.setNewLocalDataFire(resData.idToken, usuario);
      this.setNewLocalData(usuario);
      loadingEl.dismiss();

    },
    errRes => {
      loadingEl.dismiss();
      this.callBack = false;
      const code = errRes.error.error.message;
      this.message = 'Hubo un error inesperado, intentelo nuevamente.';
      if (code === 'EMAIL_EXISTS') {
        this.message = 'Este correo ya se a registrado.';
      }
      this.header = 'Fallo de validación';
      this.showAlert(this.header, this.message);
      });
    });

    if(this.callBack === true)
    {
      return this.http.put(this.baseUrl+"usuario/editarPerfil", usuario).subscribe({
        error: error => {
            console.log(error);
        }
      });
    }
  }

  private showAlert(header: string, message: string) {
    this.alertCtrl
      .create({
        header: header,
        message: message,
        buttons: ['Ok']
      })
      .then(alertEl => alertEl.present());
  }

  setNewLocalData(usuario: UsuarioPerfil)
  {
    const data = JSON.stringify({
      idPersona: usuario.idPersona,
      nickname: usuario.nickname,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      celular: usuario.celular,
      direccion: usuario.direccion,
      email: usuario.email,
      pais: usuario.pais,
      administrador: false,
      imagenPerfil: usuario.imagenPerfil,
      nombreImagen: usuario.nombreImagen,
      extension: usuario.extensionImagen
    });
    Plugins.Storage.set({ key: 'currentUser', value: data });
  }

  setNewLocalDataFire(newToken: string, usuario: UsuarioPerfil)
  {
    const data = JSON.stringify({
      userId: this.userFire.id,
      token: newToken,
      email: usuario.email
    });
    Plugins.Storage.set({ key: 'authData', value: data });

    this.userFire.token = newToken;
  }

  async getUserFire()
  {
    this.userFire = await this.authService.getCurrentUserFire().toPromise()
  }

  obtenerPublicaciones(idUsuario: string, size: number, event?): Promise<PublicacionPerfilUsuario[]>{
    let response = this.http.get<PublicacionPerfilUsuario[]>(this.baseUrl + 'publicacionComentario/' + idUsuario+'/' + this.currentlyLoaded+'/'+size).toPromise();
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

  destroyVariables() {
    this.usuarioDatos = null;
    this.currentlyLoaded = 0;
  }


}
