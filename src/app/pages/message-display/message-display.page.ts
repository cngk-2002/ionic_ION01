import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { FirestoreDataService, Chat } from 'src/app/services/firestore-data.service';
import { IonModal } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-message-display',
  templateUrl: './message-display.page.html',
  styleUrls: ['./message-display.page.scss'],
})
export class MessageDisplayPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  userID?:string;
  contentinput?:string;
  constructor(private route: ActivatedRoute, private firestoreService: FirestoreDataService,private alertCtrl: AlertController) {
    this.userID = this.route.snapshot.params['userid'].split('@')[0];
    this.newItem.userid = this.userID;
    this.ShowAllMessages();
    this.getPaginatedData();
  }

  messages: any = [];
  newItem = new Chat();

  ngOnInit() {
  }

  pageSize: number = 3; // Number of items per page
  currentPage: number = 1; // Current page number
  totalPages : number = Math.ceil(this.messages.length / this.pageSize);

  ShowAllMessages() {
    this.firestoreService.getAllDocuments().subscribe(documents => {
      this.messages = documents;
    });
  }

  calculatedate(time : any) : String{
    const now = new Date();
    const timeDifference = now.getTime()  - time.toDate();
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if(days > 0){
      return days+'日前';
    }
    else if(hours > 0){
      return (hours%24)+'時間前';
    }
    else if(minutes > 0){
      return (minutes%60)+'分前';
    }
    return '数秒前';
  }

  async confirmdelAlert(itemId:string) {
    const promptAlert = await this.alertCtrl.create({
      header: '確認',
      subHeader: '削除しても良いですか？',
      buttons: [
        {
          text: 'Cancel',
          handler() {
            console.log('You clicked "Cancel" Option');
          },
        },
        {
          text: 'OK',
          handler: () => {
            this.deleteMessage(itemId);
          }
        }
      ]
    });
    await promptAlert.present();
  }

  deleteMessage(itemId: string) {
    this.firestoreService.delete(itemId);
  }

  async showEditMessAlert(message:string, itemId:string, userid : string) {
    const promptAlert = await this.alertCtrl.create({
      header: 'Edit Message',
      // subHeader: 'Enter your information',
      inputs: [
        {
          type: 'text',
          name: 'message',
          value: message
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler() {
            console.log('You clicked "Cancel" Option');
          },
        },
        {
          text: 'Save',
          handler: (data) => {
            this.firestoreService.update(itemId,data.message,userid);
            
            },
        }
      ]
    });
    await promptAlert.present();
  }

  

  cancel() {
    this.modal.dismiss();
  }

  getPaginatedData(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.messages.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }

  getTotalPages(): number {
    return Math.ceil(this.messages.length / this.pageSize);
  }

  postmessage(){
    const now = new Date();
    this.firestoreService.create(this.newItem)
      .then(() => {
        this.newItem = {
          message: '',
          userid: '',
          timepost: now
        };
      })
    this.cancel();
  }



}

