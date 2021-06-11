import firebase from 'firebase/app';

export class Mensaje {
  idMensaje: string;
  fecha: firebase.firestore.FieldValue;
  de: string;
  contenido: string;
  path: string;
  idChat: string;
  nombreDe: string;
  miMsj: boolean;

  constructor(idMensaje: string, fecha: firebase.firestore.FieldValue, de: string,
    contenido: string, path: string, idChat: string, nombreDe: string, miMsj: boolean) {
      this.idMensaje = idMensaje;
      this.fecha = fecha;
      this.de = de;
      this.contenido = contenido;
      this.path = path;
      this.idChat = idChat;
      this.nombreDe = nombreDe;
      this.miMsj = miMsj;
  }
}

export interface imgFile {
  name: string;
  filepath: string;
  size: number;
}
