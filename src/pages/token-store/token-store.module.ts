import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TokenStorePage } from './token-store';

@NgModule({
  declarations: [
    TokenStorePage,
  ],
  imports: [
    IonicPageModule.forChild(TokenStorePage),
  ],
})
export class TokenStorePageModule {}
