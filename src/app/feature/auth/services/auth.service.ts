import { EventEmitter, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from } from 'rxjs';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user!: firebase.User;

  usuarioLogueado$ = new EventEmitter<boolean>();


  constructor(public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.user = user;
        sessionStorage.setItem('user', JSON.stringify(this.user));
      } else {
        sessionStorage.setItem('user', '');
      }
    });
  }


  login(email: string, password: string) {
    return from(this.afAuth.signInWithEmailAndPassword(email, password));
  }

  register(email: string, password: string) {
    return from(this.afAuth.createUserWithEmailAndPassword(email, password))

  }

  async logout() {
    await this.afAuth.signOut();
  }

}
