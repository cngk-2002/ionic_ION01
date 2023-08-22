import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MessageDisplayPageRoutingModule } from './message-display-routing.module';

import { MessageDisplayPage } from './message-display.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessageDisplayPageRoutingModule
  ],
  declarations: [MessageDisplayPage]
})
export class MessageDisplayPageModule {}
