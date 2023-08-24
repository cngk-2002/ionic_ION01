import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';


export class Mess{
  user?:string;
  mess?:string;
  createdTime?:Date;
}
@Injectable({
  providedIn: 'root'
})
export class FirebaseDataService {
  messRef!: AngularFirestoreCollection<Mess>
  constructor(db: AngularFirestore) { 
    this.messRef = db.collection('/message-display', ref=>ref.orderBy('createdTime','desc'))
  }
  getAllDocuments(){
    return this.messRef.snapshotChanges()
   }
   create(mess: Mess){
    mess.createdTime = new Date();
    return this.messRef.add({...mess})
   }
   delete(id: string) : Promise<void>{
    return this.messRef.doc(id).delete();
   }
   async update(id: string, mess: string){

    return await this.messRef.doc(id).update({mess: mess})
   }
   
}