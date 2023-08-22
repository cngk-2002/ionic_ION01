import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';


export class Chat {
  userid?: string;
  timepost?: Date;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FirestoreDataService {

  chatsRef!: AngularFirestoreCollection<Chat>;

  constructor(db :AngularFirestore) { 
    this.chatsRef = db.collection('/chat', ref=>ref.orderBy('timepost','desc'));
    // console.log(this.chatsRef);
  }

  getAllDocuments() {
    return this.chatsRef.snapshotChanges();
  }

  create(chat: Chat) {
    chat.timepost = new Date();
    return this.chatsRef.add({ ...chat });
  }

  delete(id:string): Promise<void>{
    return this.chatsRef.doc(id).delete();
  }

  update(id: string, message: string, userid: string): Promise<void> {
    const now = new Date();
    const updatedChat = {
      message: message,
      userid: userid,
      timepost: now
    };
    return this.chatsRef.doc(id).update(updatedChat);
  }



}
