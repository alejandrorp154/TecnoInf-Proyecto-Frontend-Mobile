import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../clases/user.class';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLogged: any = false;
  
  constructor(public auth: AngularFireAuth) {
    auth.authState.subscribe(user => (this.isLogged = user));
   }

  async login(user: User) {
    try {
      return await this.auth.signInWithEmailAndPassword(user.email, user.password);
    } catch (e) {
      console.log('Error in login', e);
    }
  }

  async register(user: User) {
    try {
      return await this.auth.createUserWithEmailAndPassword(user.email, user.password);
    } catch (e) {
      console.log('Error in register', e);
    }
  }

}
