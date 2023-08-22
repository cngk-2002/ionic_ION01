import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseAuthService } from '../services/firebase-auth.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  

  constructor(private afAuth: AngularFireAuth, private router: Router,private firebaseService:FirebaseAuthService) {}
  
  useremail?:string;
  userpassword?:string;
  userid?:string;

  async signIn() {
    console.log(this.useremail+' '+this.userpassword);
    if(this.useremail && this.userpassword){
      // this.firebaseService.signIn(this.useremail,this.userpassword);
      try{
        await this.afAuth.signInWithEmailAndPassword(this.useremail,this.userpassword)
        .then(res => {
          // this.isLoggedIn = true;
          console.error('Sign in'); 
          this.router.navigate(['/message-display/', this.useremail]);
        })
      }catch (error) {
        alert('無効なメールアドレスまたはパスワード'); 
      }
    }
    else {
      if(this.useremail){
        this.showAlert('パスワード');
      }
      else{
        this.showAlert('ユーザID'); 
      }
    }
  }

  showAlert(text:string): void {
    alert(text+' を入力してください');
  }
}
