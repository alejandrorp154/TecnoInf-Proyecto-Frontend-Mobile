import { Injectable } from '@angular/core';
import { Usuario } from '../Models/usuario.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SugerirAmigosService {

  constructor(public httpClient: HttpClient) { }

  private amigos: Usuario[] = [
    {
      idUsuario: "1",
      nickname: "Tuki",
      nombre: "Federico",
      apellido: "Gonzalez",
      celular: 123456789,
      email: "test@gmail.com"
    },
    {
      idUsuario: "2",
      nickname: "Muki",
      nombre: "Tiago",
      apellido: "Mendaro",
      celular: 987654321,
      email: "tiagoMendaro@gmail.com"
    },
    {
      idUsuario:"3",
      nickname: "Suki",
      nombre: "Rodrigo",
      apellido: "Gonzalez",
      celular: 1111111111,
      email: "rodrigo1111@gmail.com"
    }
    ]

    private baseUrl = 'http://3.18.102.215:8080/pryectoBack-web/rest';


    public async getUsuariosSugeridosAsync(): Promise<Usuario[]> {
      try {
        const url = `${this.baseUrl}/sugerirAmigos`;
        let response = await this.httpClient.get(url).toPromise();
        return response as Usuario[];
      } catch (error) {
        console.log(error);
      }
    }

    getAllUsuarios()
    {
      return [...this.amigos]
    }
}
