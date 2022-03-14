import { EventEmitter, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from, Subscription } from 'rxjs';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user!: firebase.User;
  subscription!: Subscription;

  usuarioLogueado$ = new EventEmitter<boolean>();


  constructor(public afAuth: AngularFireAuth) {
    this.subscription = this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', '');
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
    if (this.subscription) this.subscription.unsubscribe();
  }

}
