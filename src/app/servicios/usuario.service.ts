import { Rol } from '../Models/usuario.model';
import { Injectable } from '@angular/core';
import { Usuario } from '../Models/usuario.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuarios: Usuario[] = [
    {
      nombre: 'Alejandro',
      apellido: 'Rodriguez',
      email: 'email@mail.com',
      imgurl: "",
      nickname: 'aleuy',
      passphrase: 'sexy',
      uid: '1',
      rol: Rol.Administrador,
      sexo: "Masculino",
      bloqueado: false
    },
    {
      nombre: 'Leo',
      apellido: 'Messi',
      email: 'messi@mail.com',
      imgurl: "",
      nickname: 'leomessi',
      passphrase: 'crack',
      uid: '2',
      rol: Rol.Turista,
      sexo: "No sabe",
      bloqueado: false
    }
  ]

  private baseUrl = 'http://localhost:8080/pryectoBack-web/rest';

  constructor(public httpClient: HttpClient) { }

  public async getAllUsuariosAsync(): Promise<Usuario[]> {
    try {
      const url = `${this.baseUrl}/usuarios/10/10`;
      let response = await this.httpClient.get(url).toPromise();
      return response as Usuario[];
    } catch (error) {
      console.log(error);
    }
  }

  getAllUsuarios(){
    return [...this.usuarios];
  }

  getUsuario(idUsuario: string){
    return {...this.usuarios.find(user => {
      return user.uid === idUsuario
    })};
  }

  addUsuario(uid: string, nombre: string, apellido: string, email: string, imgurl: string, nickname: string, passphrase: string, rol: Rol, sexo: string){
    const nuevoUsuario = new Usuario(uid, nombre, apellido, email, imgurl, nickname, passphrase, rol, sexo, false);
    //hacer el http put
    this.usuarios.push(nuevoUsuario);
  }

  deleteUsuario(idUsuario: string){
    this.usuarios = this.usuarios.filter(user => {
      return user.uid !== idUsuario;
    })
  }

  bloquearUsuario(idUsuario: string){
    const user = this.usuarios.find(u => u.uid === idUsuario);
    if(user != null){
      user.bloqueado = true;
    }
  }

}
