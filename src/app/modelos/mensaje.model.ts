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
}

export interface imgFile {
  name: string;
  filepath: string;
  size: number;
}
