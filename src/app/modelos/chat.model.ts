import firebase from 'firebase/app';

export interface Chat {
  idChat: string;
  uids: string[];
  fecha: firebase.firestore.FieldValue;
}
