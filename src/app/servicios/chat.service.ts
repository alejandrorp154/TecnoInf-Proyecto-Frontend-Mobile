import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Mensaje } from '../modelos/mensaje.model';
import { Chat } from '../modelos/chat.model';
import { Usuario } from '../modelos/usuario.model';

export interface User {
  uid: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  currentUser: User = null;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.afAuth.onAuthStateChanged((user) => {
      this.currentUser = user;
    });
  }

  async signup({ email, password }): Promise<any> {
    const credential = await this.afAuth.createUserWithEmailAndPassword(
      email,
      password
    );

    const uid = credential.user.uid;

    return this.afs.doc(
      `users/${uid}`
    ).set({
      uid,
      email: credential.user.email,
    })
  }

  signIn({ email, password }) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  signOut(): Promise<void> {
    return this.afAuth.signOut();
  }

  // Chat functionality

  addChatMessage(msj, path, idChat) {
    return this.afs.collection('mensajes').add({
      contenido: msj,
      path: path,
      de: this.currentUser.uid,
      idChat: idChat,
      fecha: firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  crearChat(uids) {
    return this.afs.collection('chats').add({
      uids: uids,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  obtenerMensajes(chatId: string) {
    let users = [];
    return this.getUsers().pipe(
      switchMap(res => {
        users = res;
        return this.afs.collection('mensajes', ref => ref.where('chat', '==', chatId)
          .orderBy('fecha')).valueChanges({ idField: 'idMensaje' }) as Observable<Mensaje[]>;
      }),
      map(mensajes => {
        // Get the real name for each user
        for (let m of mensajes) {
          m.nombreDe = this.getUserForMsg(m.de, users);
          m.miMsj = this.currentUser.uid === m.de;
        }
        return mensajes
      })
    )
  }

  private getUsers() {
    return this.afs.collection('users').valueChanges({ idField: 'uid' }) as Observable<User[]>;
  }

  private getUser(uid: string) {
    return this.afs.collection('users', ref => ref.where('uid', '==', uid)).valueChanges({ idField: 'uid'}) as Observable<User[]>;
  }

  private getUserForMsg(msgFromId, users: User[]): string {
    for (let usr of users) {
      if (usr.uid == msgFromId) {
        return usr.email;
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
  obtenerMisChats() {
    if (this.currentUser)
    return this.afs.collection('chats', ref => ref.where('uids', 'array-contains', this.currentUser.uid).orderBy('fecha', 'desc')).valueChanges({ idField: 'id' }) as Observable<any>;
  }

  private getChatroom(uids: []) {
    return this.afs.collection('chatrooms', ref => ref.where('uids', '==', uids)).valueChanges({ idField: 'id'}) as Observable<any>;
  }

}
