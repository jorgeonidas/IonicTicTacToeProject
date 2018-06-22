import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PreGamePage } from './pre-game';

@NgModule({
  declarations: [
    PreGamePage,
  ],
  imports: [
    IonicPageModule.forChild(PreGamePage),
  ],
})
export class PreGamePageModule {}
