import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Mensaje } from '../modelos/mensaje.model';
import { Chat } from '../modelos/chat.model';
import { AuthService } from './auth.service';
import { UserFire } from '../modelos/userFire.model';
import { UsuarioService } from './usuario.service';
import { Usuario } from '../modelos/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  currentUserFire: UserFire = null;
  currentUser: Usuario;

  constructor(private authService: AuthService, private usuarioService: UsuarioService, private afs: AngularFirestore) {
    this.authService.getCurrentUserFire().subscribe(res => this.currentUserFire = res);
    this.authService.getCurrentUser().subscribe(res => this.currentUser = res);
  }

  // Chat functionality

  addChatMessage(msj, path, idChat, nombreDe) {
    return this.afs.collection('mensajes').add({
      contenido: msj,
      path: path,
      de: this.currentUserFire.id,
      nombreDe: nombreDe,
      idChat: idChat,
      fecha: firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  async crearChat(uids: string[], nombre: string): Promise<string> {
    let idChat: string;
    await this.afs.collection('chats').add({
      uids: uids,
      fecha: firebase.firestore.FieldValue.serverTimestamp(),
      nombre: nombre
    }).then(function(docRef) {
      console.log("ChatId creado: ", docRef.id);
      idChat = docRef.id;
    })
    .catch(function(error) {
        console.error("Error creando el chat en Firebase: ", error);
    });
    return new Promise(resolve => resolve(idChat));
  }

  async eliminar(idChat: string): Promise<boolean> {
    console.log(idChat);
    let res: boolean;
    await this.afs.collection('chats').doc(idChat).delete().then(function(docRef) {
      console.log(docRef);
      console.log("Se eliminó el chat: " + idChat);
      res = true;
    }).catch(function(error) {
        console.error("Error eliminando el chat en Firebase: ", error);
        res = false;
    });
    return new Promise(resolve => resolve(res));
  }

  obtenerMensajes(chatId: string) {
    console.log('obtenerMensajes chatId = ' + chatId);
    let users = [];
    (this.afs.collection('mensajes', ref => ref.where('idChat', '==', chatId)
          .orderBy('fecha')).valueChanges({ idField: 'id' }) as Observable<Mensaje[]>).subscribe(res =>
            console.log(res));
    return this.getUsers().pipe(
      switchMap(res => {
        users = res;
        console.log(users);
        return this.afs.collection('mensajes', ref => ref.where('idChat', '==', chatId)
          .orderBy('fecha')).valueChanges({ idField: 'id' }) as Observable<Mensaje[]>;
      }),
      map(mensajes => {
        // Get the real name for each user
        for (let m of mensajes) {
          m.nombreDe = this.getUserForMsg(m.de, users);
          m.miMsj = this.currentUserFire.id === m.de;
        }
        console.log(mensajes);
        return mensajes
      })
    )
  }

  private getUsers() {
    //this.usuarioService.getAllUsuariosObs().subscribe(res => console.log(res));
    return this.usuarioService.getAllUsuariosObs() as Observable<Usuario[]>;
  }

  private getUser(uid: string) {
    return this.usuarioService.getUsuario(uid);
  }

  private getUserForMsg(msgFromId, users: UserFire[]): string {//console.log(msgFromId);
    if(this.currentUser && this.currentUser.idPersona == msgFromId) {
      return this.currentUser.nombre + ' ' + this.currentUser.apellido;}
    for (let usr of users) {//console.log(usr, usr['idPersona']);
      if (usr['idPersona'] == msgFromId) {
        //console.log('entró');
        return usr['nombre'] + ' ' + usr['apellido'];
      }
    }
    return 'Deleted';
  }
/*
  getMyChatrooms(): Observable<Chat[]> {
    //if (this.currentUser)
    return new Observable((observer) => observer.next([
      {uids: ["WnVrwbfSYjYULq1uCQ0pUOZhBH13", "sSVDvYmnSKSuzn3MwyNRYsZ1Mef1"], fecha: firebase.firestore.FieldValue.serverTimestamp(), id: "5wZ2HnMWdZ6WPYHKyYKD"},
      {updatedAt: firebase.firestore.FieldValue.serverTimestamp(), uids: ["WnVrwbfSYjYULq1uCQ0pUOZhBH13", "bFOJqayOcKQRVCb4WdPOQdF8oRy2"], id: "NkHrH5aVQrfS3i2Fm4Fs"}]));
  }*/

  obtenerChat(idChat: string) {
    try {
      return this.afs.collection('chats').doc(idChat).get() as Observable<any>;
    } catch (ex) {
      console.log(ex);
      return new Observable((observer) => observer.next(null));
    }
  }

  obtenerMisChats() {
    console.log(this.currentUserFire);
    if (this.currentUserFire){
      console.log('entró a buscar los chats', this.currentUserFire.id);
      return this.afs.collection('chats', ref => ref.where('uids', 'array-contains', this.currentUserFire.id).orderBy('fecha', 'desc')).valueChanges({ idField: 'id' }) as Observable<any>;
    } else {
      return new Observable((observer) => observer.next([]));
    }
  }

  private getChatroom(uids: []) {
    return this.afs.collection('chatrooms', ref => ref.where('uids', '==', uids)).valueChanges({ idField: 'id'}) as Observable<any>;
  }

}
