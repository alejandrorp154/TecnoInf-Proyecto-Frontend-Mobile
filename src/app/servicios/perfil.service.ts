import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Perfil, UsuarioPerfil } from '../modelos/perfil';
import { Usuario } from '../modelos/usuario.model';
import { Publicacion } from 'src/app/modelos/perfil';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  public usuarioDatos: Usuario = null;

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

  obtenerPublicaciones(idUsuario: string, size: number, offsize: number): Promise<Publicacion[]>{
    return this.http.get<Publicacion[]>(this.baseUrl + 'publicacionComentario/' + idUsuario+'/' + offsize+'/'+size).toPromise();
  }
  
}
