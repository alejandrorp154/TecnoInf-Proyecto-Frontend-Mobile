import { Injectable } from '@angular/core';
import { Usuario } from '../Models/usuario.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Medalla } from '../Models/medalla.model';
import { Persona, Rol } from '../modelos/persona.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  readonly estados = {}


  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      //Authorization: 'my-auth-token'
    })
  };

  // private usuarios: Persona[] = [

  //   {
  //     idUsuario: '1',
  //     nombre: 'Alejandro',
  //     apellido: 'Rodriguez',
  //     email: 'email@mail.com',
  //     imgUrl: "",
  //     nickname: 'aleuy',
  //     passphrase: 'sexy',
  //     idPersona: '1',
  //     rol: Rol.Administrador,
  //     sexo: "Masculino",
  //     bloqueado: false,
  //     pais: 'Uruguay',
  //     medalla: new Medalla(),
  //     celular: 123
  //   },
  //   {
  //     idUsuario: '2',
  //     nombre: 'Leo',
  //     apellido: 'Messi',
  //     email: 'messi@mail.com',
  //     imgUrl: "",
  //     nickname: 'leomessi',
  //     passphrase: 'crack',
  //     idPersona: '2',
  //     rol: Rol.Turista,
  //     sexo: "No sabe",
  //     bloqueado: false,
  //     pais: 'Argentina',
  //     medalla: new Medalla(),
  //     celular: 1234
  //   },
  //   {
  //     idUsuario: '3',
  //     nombre: 'Benito',
  //     apellido: 'Camela',
  //     email: 'elbenito@mail.com',
  //     imgurl: "",
  //     nickname: 'benitoc',
  //     passphrase: 'jajaj',
  //     rol: Rol.Turista,
  //     sexo: "Masculino",
  //     bloqueado: false,
  //     pais: 'Mexico',
  //     medalla: new Medalla(),
  //     celular: '1235'
  //   }
  // ]

  private baseUrl = 'http://3.18.102.215:8080/pryectoBack-web/rest';

  constructor(public httpClient: HttpClient) { }


  //public async getAllUsuariosAsync(offset: number, size: number): Promise<Usuario[]> {
  public async getAllUsuariosAsync(): Promise<Persona[]> {
    try {
      const url = `${this.baseUrl}/visualizacion/obtenerUsuarios/0/10`; //PASARLE EL OFFSET Y SIZE
      let response = await this.httpClient.get(url).toPromise();
      return response as Persona[];
    } catch (error) {
      console.log(error);
    }
  }

  /*getAllUsuarios(){
    return [...this.usuarios];
  }

  getUsuario(idUsuario: string){
    return {...this.usuarios.find(user => {
      return user.idUsuario === idUsuario
    })};
  }*/

  // addUsuario(uid: string, nombre: string, apellido: string, email: string, imgurl: string, nickname: string, passphrase: string, rol: Rol, sexo: string, pais: string){
    // const nuevoUsuario = new Usuario(uid, nickname, nombre, apellido, /*celular*/0, email, passphrase, sexo, rol, imgurl, false, pais, /*medalla*/null);
      // return user.idPersona === idUsuario
    // })};
  // }

  /*addUsuario(idPersona: string, nombre: string, apellido: string, email: string, imgUrl: string, nickname: string, passphrase: string, rol: Rol, sexo: string){
    const nuevoUsuario: Persona = {idPersona, nombre, apellido, email, imgUrl, nickname, rol, sexo};
    //hacer el http put
    this.usuarios.push(nuevoUsuario);
  }

  deleteUsuario(idUsuario: string){
    this.usuarios = this.usuarios.filter(user => {
      return user.idPersona !== idUsuario;
    })
  }*/
  //HACER ESTO CON LA API

  bloquearUsuario(idUsuario: string){
    const url = `${this.baseUrl}/usuario/bloquearUsuario/${idUsuario}`;
    this.httpClient.put<Usuario>(url, idUsuario, this.httpOptions)
    .subscribe(data => {
      console.log(data['_body']);
     }, error => {
      console.log(error);
    });
  }
  desbloquearUsuario(idUsuario: string){
    const url = `${this.baseUrl}/usuario/desbloquearUsuario/${idUsuario}`;
    this.httpClient.put<Usuario>(url, idUsuario, this.httpOptions)
    .subscribe(data => {
      console.log(data['_body']);
     }, error => {
      console.log(error);
    });
  }

  //LO COMENTO PARA HACER EL PR Y ME QUEDA HACERLO CON LA API
  /*respuestaContacto(idPersona: string, contactoAAgregar: string, estado: string){
    const url = `${this.baseUrl}/usuario/respuestaContacto/`;
    let putData = {
      "idPersona": idPersona,
      "contactoIdPersona": contactoAAgregar,
      "estadoContactos": estado
    const user = this.usuarios.find(u => u.idPersona === idUsuario);
    if(user != null){
      user.bloqueado = true;
    }
    return this.httpClient.put<any>(url, putData, this.httpOptions)
    .subscribe(data => {
      console.log(data['_body']);
     }, error => {
      console.log(error);
    });
  }


  agregarContacto(idPersona: string, idPersona2: string){
    const url = `${this.baseUrl}/usuario/agregarContacto/${idPersona}/${idPersona2}`;
    let body = {
      "idPersona": idPersona,
      "idPersona2": idPersona2
    }
    return this.httpClient.post<Usuario>(url, body, this.httpOptions)
    .subscribe(data => {
      console.log(data['_body']);
     }, error => {
      console.log(error);
    });
  }

  bajaContacto(idPersona: string, idPersona2: string){
    const url = `${this.baseUrl}/usuario/bajaContacto/${idPersona}/${idPersona2}`;
    return this.httpClient.delete<Usuario>(url, this.httpOptions)
    .subscribe(data => {
      console.log(data['_body']);
     }, error => {
      console.log(error);
    });
  }*/

}
