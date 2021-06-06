import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Rol, Usuario } from '../Models/usuario.model';

export interface User {
  uid: string;
  email: string;
}

export interface Message {
  createdAt: firebase.firestore.FieldValue;
  id: string;
  from: string;
  msg: string;
  mediaUrl: string;
  chatroom: string;
  fromName: string;
  myMsg: boolean;
}

export interface Chatroom {
  id: string;
  uids: string[];
  updatedAt: firebase.firestore.FieldValue;
}

export interface imgFile {
  name: string;
  filepath: string;
  size: number;
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

  addChatMessage(msg, mediaUrl, chatroomId) {
    return this.afs.collection('messages').add({
      msg: msg,
      mediaUrl: mediaUrl,
      from: this.currentUser.uid,
      chatroom: chatroomId,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  createChatroom(uids) {
    return this.afs.collection('chatrooms').add({
      uids: uids,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  getChatMessages(chatroomId: string) {
    let users = [];
    return this.getUsers().pipe(
      switchMap(res => {
        users = res;
        return this.afs.collection('messages', ref => ref.where('chatroom', '==', chatroomId)
          .orderBy('createdAt')).valueChanges({ idField: 'id' }) as Observable<Message[]>;
      }),
      map(messages => {
        // Get the real name for each user
        for (let m of messages) {
          m.fromName = this.getUserForMsg(m.from, users);
          m.myMsg = this.currentUser.uid === m.from;
        }
        return messages
      })
    )
  }

  getFriends() {
    if (this.currentUser)
      return this.friends.filter(f => f.uid != this.currentUser.uid);
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

  getMyChatrooms(): Observable<Chatroom[]> {
    //if (this.currentUser)
    return new Observable((observer) => observer.next([
      {uids: ["WnVrwbfSYjYULq1uCQ0pUOZhBH13", "sSVDvYmnSKSuzn3MwyNRYsZ1Mef1"], updatedAt: firebase.firestore.FieldValue.serverTimestamp(), id: "5wZ2HnMWdZ6WPYHKyYKD"},
      {updatedAt: firebase.firestore.FieldValue.serverTimestamp(), uids: ["WnVrwbfSYjYULq1uCQ0pUOZhBH13", "bFOJqayOcKQRVCb4WdPOQdF8oRy2"], id: "NkHrH5aVQrfS3i2Fm4Fs"}]));
  }

  private getChatroom(uids: []) {
    return this.afs.collection('chatrooms', ref => ref.where('uids', '==', uids)).valueChanges({ idField: 'id'}) as Observable<any>;
  }

  getCurrentUser(): Usuario {
    if (this.currentUser)
      return this.friends.find(f => f.uid == this.currentUser.uid);
  }


  friends = [ { uid: 'WnVrwbfSYjYULq1uCQ0pUOZhBH13', nickname: 'michel', passphrase: '12345678', nombre: 'Michel', apellido: 'Jackson', email: 'michel@mail.com',
  sexo: 'M', rol: Rol.Turista, imgurl: 'https://www.cambio16.com/wp-content/uploads/2017/11/michael-jackson-tv-show-joseph-fiennes.jpg', bloqueado: false },
{ uid: 'gfvakYxGUpXDzs4o9tMDgbm8rbw1', nickname: 'madonna', passphrase: '12345678', nombre: 'Louise', apellido: 'Madonna', email: 'madonna@mail.com',
  sexo: 'F', rol: Rol.Turista, imgurl: 'https://www.lecturas.com/medio/2020/09/30/madonna_2ec43912_800x800.jpg', bloqueado: false },
{ uid: 'Aj07lsjkMnPecxTCaPyVrXwzPtA3', nickname: 'freddy', passphrase: '12345678', nombre: 'Freddy', apellido: 'Mercury', email: 'freddy@mail.com',
  sexo: 'M', rol: Rol.Turista, imgurl: 'https://www.infobae.com/new-resizer/XpYTHbU4fzIIz-r25y5lkgs2XIA=/420x630/filters:format(jpg):quality(85)/cloudfront-us-east-1.images.arcpublishing.com/infobae/44NAV6FYPFFJDDVBGSTCCQ6PMY.jpg', bloqueado: false },
{ uid: 'ptZBGiufbNVzcYohmJOtmUpEPiu2', nickname: 'whitney', passphrase: '12345678', nombre: 'Whitney', apellido: 'Huston', email: 'whitney@mail.com',
  sexo: 'F', rol: Rol.Turista, imgurl: 'https://www.infobae.com/new-resizer/rmG6gf7mexSjCRU59jHdQZQcvQw=/992x661/filters:format(jpg):quality(85)/arc-anglerfish-arc2-prod-infobae.s3.amazonaws.com/public/44CRQML4WJEAPNA5MNCMR4I4QI.jpg', bloqueado: false },
{ uid: 'NOSED7e1U0S2YVXyhUjYJ8GRG7N2', nickname: 'elton', passphrase: '12345678', nombre: 'Elton', apellido: 'John', email: 'elton@mail.com',
  sexo: 'M', rol: Rol.Turista, imgurl: 'https://loff.it/wp-content/uploads/2017/03/loffit-elton-john-cantante-compositor-y-original-icono-del-pop-03-600x450-1616577881.jpg', bloqueado: false},
{ uid: 'vAxXWcNetEOU9EmP9YrbSMJDJcI2', nickname: 'celine', passphrase: '12345678', nombre: 'Celine', apellido: 'Dion', email: 'celine@mail.com',
  sexo: 'F', rol: Rol.Turista, imgurl: 'https://resizer.glanacion.com/resizer/_Spsz8IVwi7-0vuYjRw2F_IhWMU=/768x0/filters:quality(100)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/QQV5XVWPNJH4NPRZE33HVGK42M.jpg', bloqueado: false},
{ uid: 'OvBOZxu6zRflZMHWtCJYd62F8JW2', nickname: 'stevie', passphrase: '12345678', nombre: 'Stevie', apellido: 'Wonder', email: 'stevie@mail.com',
  sexo: 'M', rol: Rol.Turista, imgurl: 'https://los40es00.epimg.net/los40/imagenes/2020/05/13/los40classic/1589357730_131396_1589362585_rrss_normal.jpg', bloqueado: false},
{ uid: 'iBXRD6E3tjT9DEjQteC9bxyAspM2', nickname: 'tina', passphrase: '12345678', nombre: 'Tina', apellido: 'Turner', email: 'tina@mail.com',
  sexo: 'F', rol: Rol.Turista, imgurl: 'https://los40es00.epimg.net/los40/imagenes/2018/11/22/los40classic/1542909340_729946_1542959141_noticia_normal.jpg', bloqueado: false },
{ uid: 'sSVDvYmnSKSuzn3MwyNRYsZ1Mef1', nickname: 'bruce', passphrase: '12345678', nombre: 'Bruce', apellido: 'Springteen', email: 'bruce@mail.com',
  sexo: 'M', rol: Rol.Turista, imgurl: 'https://www.shemazing.net/wp-content/uploads/2016/10/screen-shot-2016-10-02-at-17-15-36.png', bloqueado: false },
{ uid: 'bFOJqayOcKQRVCb4WdPOQdF8oRy2', nickname: 'cindy', passphrase: '12345678', nombre: 'Cindy', apellido: 'Louper', email: 'cindy@mail.com',
  sexo: 'F', rol: Rol.Turista, imgurl: 'https://www.rockandpop.cl/wp-content/uploads/2019/06/Cyndi-Lauper-400x360.jpg', bloqueado: false }
];
}
