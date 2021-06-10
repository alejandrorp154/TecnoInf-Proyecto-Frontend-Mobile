import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Persona, Rol } from '../modelos/persona.model';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuarios: Persona[] = [
    {
      nombre: 'Alejandro',
      apellido: 'Rodriguez',
      email: 'email@mail.com',
      imgUrl: "",
      nickname: 'aleuy',
      idPersona: '1',
      rol: Rol.Administrador,
      sexo: "Masculino",
      bloqueado: false
    },
    {
      nombre: 'Leo',
      apellido: 'Messi',
      email: 'messi@mail.com',
      imgUrl: "",
      nickname: 'leomessi',
      idPersona: '2',
      rol: Rol.Turista,
      sexo: "No sabe",
      bloqueado: false
    }
  ]

  private baseUrl = 'http://localhost:8080/pryectoBack-web/rest';

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  public async getAllUsuariosAsync(): Promise<Persona[]> {
    try {
      const url = `${this.baseUrl}/usuarios/10/10`;
      let response = await this.httpClient.get(url).toPromise();
      return response as Persona[];
    } catch (error) {
      console.log(error);
    }
  }

  public getAllUsuariosObs(): Observable<Persona[]> {
    try {
      const url = `${this.baseUrl}/usuarios/10/10`;
      return this.httpClient.get<Persona[]>(url);
    } catch (error) {
      console.log(error);
    }
  }

  getAllUsuarios(){
    return [...this.usuarios];
  }

  getUsuario(idUsuario: string){
    return {...this.usuarios.find(user => {
      return user.idPersona === idUsuario
    })};
  }

  addUsuario(idPersona: string, nombre: string, apellido: string, email: string, imgUrl: string, nickname: string, passphrase: string, rol: Rol, sexo: string){
    const nuevoUsuario: Persona = {idPersona, nombre, apellido, email, imgUrl, nickname, rol, sexo};
    //hacer el http put
    this.usuarios.push(nuevoUsuario);
  }

  deleteUsuario(idUsuario: string){
    this.usuarios = this.usuarios.filter(user => {
      return user.idPersona !== idUsuario;
    })
  }

  bloquearUsuario(idUsuario: string){
    const user = this.usuarios.find(u => u.idPersona === idUsuario);
    if(user != null){
      user.bloqueado = true;
    }
  }

  getContactos(idUsuario: string) {
    /* ************** EDITAR GET ************** */
    return this.getAllUsuarios();
    /* ************** END EDITAR GET ************** */
  }

  getLoggedUser(): Promise<Persona> {
    return new Promise(async (resolve) => {
      let userFire = await this.authService.getCurrentUserFire().toPromise();
      resolve(this.getUsuario(userFire.id));
    });
  }

}
