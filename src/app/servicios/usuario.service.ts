import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Persona, Rol } from '../modelos/persona.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

// <<<<<<< Updated upstream
  // private usuarios: Persona[] = [
    // {
      // nombre: 'Alejandro',
      // apellido: 'Rodriguez',
      // email: 'email@mail.com',
      // imgUrl: "",
      // nickname: 'aleuy',
      // idPersona: '1',
      // rol: Rol.Administrador,
      // sexo: "Masculino",
      // bloqueado: false
    // },
    // {
      // nombre: 'Leo',
      // apellido: 'Messi',
      // email: 'messi@mail.com',
      // imgUrl: "",
      // nickname: 'leomessi',
      // idPersona: '2',
      // rol: Rol.Turista,
      // sexo: "No sabe",
      // bloqueado: false
    // }
  // ]
// =======
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


  private baseUrl = 'http://localhost:8080/pryectoBack-web/rest';

  usuarios: Persona[];

  constructor(public httpClient: HttpClient) { }

  //public async getAllUsuariosAsync(offset: number, size: number): Promise<Usuario[]> {
  public async getAllUsuariosAsync(): Promise<Persona[]> {
    try {
      const url = `${this.baseUrl}/usuario/0/10`;
      let response = await this.httpClient.get(url).toPromise();
      this.usuarios = response as Persona[];
      return response as Persona[];
    } catch (error) {
      console.log(error);
    }
  }

  /*getUsuario(idUsuario: string){
    return {...this.usuarios.find(user => {
      return user.idPersona === idUsuario
    })};
  }*/


  // addUsuario(uid: string, nombre: string, apellido: string, email: string, imgurl: string, nickname: string, passphrase: string, rol: Rol, sexo: string, pais: string){
    // const nuevoUsuario = new Usuario(uid, nickname, nombre, apellido, /*celular*/0, email, passphrase, sexo, rol, imgurl, false, pais, /*medalla*/null);
      // return user.idPersona === idUsuario
    // })};
  // }
  addUsuario(idPersona: string, email: string, nombre: string, apellido: string, nickname: string,
    direccion: string, celular: string, pais: string, imagenPerfil: string, nombreImagen: string, extensionImagen: string){
    //hacer el http put
    // this.usuarios.push(nuevoUsuario);
    
    const url = `${this.baseUrl}/usuario/registrarUsuario/`;
    let postData = {
      "idPersona": idPersona,
      "email": email,
      "nombre": nombre,
      "apellido": apellido,
      "nickname": nickname,
      "direccion": direccion,
      "celular": celular,
      "pais": pais,
      "imagenPerfil": imagenPerfil,
      "nombreImagen": nombreImagen,
      "extensionImagen": extensionImagen
    }
    return this.httpClient.post<Persona>(url, postData, this.httpOptions)
    .subscribe(data => {
      console.log(data['_body']);
     }, error => {
      console.log(error);
    });
  }

  deleteUsuario(idUsuario: string){
    this.usuarios = this.usuarios.filter(user => {
      return user.idPersona !== idUsuario;
    })
  }
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

  

}
