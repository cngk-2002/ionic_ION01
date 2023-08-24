import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { FirebaseDataService, Mess } from 'src/app/services/firestore-data.service';
import { AlertController } from '@ionic/angular';
import { fromUnixTime, differenceInSeconds } from 'date-fns';
import { IonModal } from '@ionic/angular';
@Component({
  selector: 'app-message',
  templateUrl: './message-display.page.html',
  styleUrls: ['./message-display.page.scss'],
})
export class MessageDisplayPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  messNotification = ''
  isToastOpen = false
  messEdit = ''
  idEdit = ''
  isToastOpenEdit = false;
  startIndex = 0;
  endIndex = 3;
  checkBack = true
  checkContinue = false
  user: string = "";
  messages: any[] = [];
  newItem = ''
  setOpenEdit(isOpen: boolean) {
    this.isToastOpenEdit = isOpen;
  }
  constructor(private route: ActivatedRoute, private firebaseService: FirebaseAuthService,
    private router: Router, private firestoreService: FirebaseDataService, private alertCtrl: AlertController) {
    this.route.queryParams.subscribe(params => {
      this.user = params['user'];
    });
    this.ShowAllTutorials()

  }
  ngOnInit() {
  }

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  ShowAllTutorials() {
    
    this.firestoreService.getAllDocuments().subscribe(documents => {

      this.messages = documents;
      if(documents.length <= 3){
        this.checkContinue = true
       } else{
        this.checkContinue = false
       }
 
    });
  }

  differenceInHour(articleDate: any) {

    const currentTime = new Date();
    const initialUnixTime = articleDate.seconds;
    const initialDate = fromUnixTime(initialUnixTime);

    const temp = differenceInSeconds(currentTime, initialDate);
    return this.formatDuration(temp)
  }

  formatDuration(seconds: number): string {
    if (seconds < 60) {
      return `${seconds} 秒`;
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} 分`;
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return `${hours} 時間`;
    } else {
      const days = Math.floor(seconds / 86400);
      const remainingSeconds = seconds % 86400;
      const hours = Math.floor(remainingSeconds / 3600);
      return `${days} 日 ${hours} 時間`;
    }
  }

  createMess() {

    if (this.newItem.trim().length === 0 ) {
      this.messNotification = 'Please enter the message...'
      this.setOpen(true)
    } else {
      this.firestoreService.create({ user: this.user, mess: this.newItem })
        .then(() => {
          this.newItem = ''
        })
    }
  }

  setArray() {
   

    return this.messages.slice(this.startIndex, this.endIndex);
  }

  handleBack() {
    if (this.startIndex > 0) {
      this.startIndex -= 3
      this.endIndex -= 3
      if (this.startIndex === 0) {
        this.checkBack = true
        this.checkContinue = false
      } else {
        this.checkContinue = false
        this.checkBack = false
      }
    }
  }

  handleContinue() {
    if (this.endIndex < this.messages.length) {
      this.startIndex += 3
      this.endIndex += 3
      if (this.endIndex >= this.messages.length) {
        this.checkContinue = true
        this.checkBack = false
      } else {
        this.checkContinue = false
        this.checkBack = false
      }
    }
  }

  handleDelete(user: string, id: string) {
    if (this.user === user) {
      this.showBasicAlertDetele(id)
    } else {
      this.messNotification = 'Not Allowed.'
      this.setOpen(true)
    }
  }

  handleUpdate(user: string, id: string, mess: string) {

    if (this.user === user) {
      this.idEdit = id
      this.messEdit = mess
      this.setOpenEdit(true)

    } else {
      this.messNotification = 'Not Allowed.'
      this.setOpen(true)
    }
  }

  onclickEdit() {
    if (this.messEdit.trim().length !== 0) {
      this.firestoreService.update(this.idEdit, this.messEdit);
    }
    this.modal.dismiss()
  }

  async showBasicAlertDetele(id: string) {
    const alertBox = await this.alertCtrl.create({
      header: '確認',
      subHeader: '削除しても良いですか？',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Delete',
          handler: (data) => {
            this.firestoreService.delete(id);
          }
        },
      ]
    });
    await alertBox.present();
  }
}

