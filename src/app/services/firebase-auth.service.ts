import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  constructor(private afAuth: AngularFireAuth, private router: Router) { }
  async signInWithGoogle() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await this.afAuth.signInWithPopup(provider);
      if (result.user) {
        const userEmail = result.user.email;
        const userName = result.user.displayName;
        // Navigate to user profile page with user email and name
        this.router.navigate(['/profile'], { queryParams: { email: userEmail, name: userName } });
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  }

  async signOutFromGoogle() {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  isLoggedIn = false

  async signIn(email:string, password:string){

    await this.afAuth.signInWithEmailAndPassword(email,password)
    .then(res => {
      this.isLoggedIn = true;
    })

  }

}
