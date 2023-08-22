import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessageDisplayPage } from './message-display.page';

const routes: Routes = [
  {
    path: '',
    component: MessageDisplayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessageDisplayPageRoutingModule {}
