import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Perfil, PublicacionPerfilUsuario, UsuarioPerfil } from '../modelos/perfil';
import { Usuario } from '../modelos/usuario.model';
import { Publicacion } from 'src/app/modelos/perfil';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  public usuarioDatos: Usuario = null;
  public currentlyLoaded: number = 0;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
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
    return this.http.put(this.baseUrl+"usuario/editarPerfil", usuario).subscribe({
      error: error => {
          console.log(error);
      }
  });
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
