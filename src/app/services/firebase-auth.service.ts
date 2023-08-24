import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService {

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private toastController: ToastController
  ) {}

  async loginWithEmail(email : string, password : string) {
    try {
      await this.auth.signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        this.router.navigate(['/message-display'], { queryParams: { user: email.split('@')[0]} });
      })
    } catch (error) {
      console.error('Sign-in error:', error);
      this.presentToast('ログイン中にエラーが発生しました');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }
}
