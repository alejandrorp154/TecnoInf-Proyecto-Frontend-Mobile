import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { Rol, Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usuarios: Usuario[] = [
    { usuarioId: 1, nickname: 'michel', passphrase: '12345678', nombre: 'Michel', apellido: 'Jackson', email: 'michel@mail.com', sexo: 'M', rol: Rol.Turista },
    { usuarioId: 2, nickname: 'madonna', passphrase: '12345678', nombre: 'Louise', apellido: 'Madonna', email: 'madonna@mail.com', sexo: 'F', rol: Rol.Turista },
    { usuarioId: 3, nickname: 'freddy', passphrase: '12345678', nombre: 'Freddy', apellido: 'Mercury', email: 'freddy@mail.com', sexo: 'M', rol: Rol.Turista },
    { usuarioId: 4, nickname: 'whitney', passphrase: '12345678', nombre: 'Whitney', apellido: 'Huston', email: 'whitney@mail.com', sexo: 'F', rol: Rol.Turista },
    { usuarioId: 5, nickname: 'elton', passphrase: '12345678', nombre: 'Elton', apellido: 'John', email: 'elton@mail.com', sexo: 'M', rol: Rol.Turista },
    { usuarioId: 6, nickname: 'celine', passphrase: '12345678', nombre: 'Celine', apellido: 'Dion', email: 'celine@mail.com', sexo: 'F', rol: Rol.Turista },
    { usuarioId: 7, nickname: 'stevie', passphrase: '12345678', nombre: 'Stevie', apellido: 'Wonder', email: 'stevie@mail.com', sexo: 'M', rol: Rol.Turista },
    { usuarioId: 8, nickname: 'tina', passphrase: '12345678', nombre: 'Tina', apellido: 'Turner', email: 'tina@mail.com', sexo: 'F', rol: Rol.Turista },
    { usuarioId: 9, nickname: 'bruce', passphrase: '12345678', nombre: 'Bruce', apellido: 'Springteen', email: 'bruce@mail.com', sexo: 'M', rol: Rol.Turista },
    { usuarioId: 10, nickname: 'cindy', passphrase: '12345678', nombre: 'Cindy', apellido: 'Louper', email: 'cindy@mail.com', sexo: 'F', rol: Rol.Turista }
  ];

  constructor() {

  }

  public getAllUsers(): Usuario[]{
    return this.usuarios;
  }

  public async getAllUsersAsync(): Promise<Usuario[]> {
    return new Promise(resolve => {
      setTimeout(() => { resolve(this.usuarios) }, 3000);
    });
  }

  public async getMaleUsersAsync(): Promise<Usuario[]> {
    return new Promise(resolve => {
      setTimeout(() => { resolve(this.usuarios.filter(u => u.sexo == 'M')) }, 2000);
    });
  }

  public async getFemaleUsersAsync(): Promise<Usuario[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.usuarios.filter(u => u.sexo == 'F'));
      }, 1500);
    });
  }

  public getAllUsersObservable(): Observable<Usuario[]> {
    return new Observable((observer) => {
      setTimeout(() => { observer.next(this.usuarios) }, 2500);
    });
  }

}
