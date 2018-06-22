import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalGameAlertPage } from './modal-game-alert';

@NgModule({
  declarations: [
    ModalGameAlertPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalGameAlertPage),
  ],
})
export class ModalGameAlertPageModule {}
