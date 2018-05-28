import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CharacterSelectionPage } from './character-selection';

@NgModule({
  declarations: [
    CharacterSelectionPage,
  ],
  imports: [
    IonicPageModule.forChild(CharacterSelectionPage),
  ],
})
export class CharacterSelectionPageModule {}
