import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TokenGaleryPage } from './token-galery';

@NgModule({
  declarations: [
    TokenGaleryPage,
  ],
  imports: [
    IonicPageModule.forChild(TokenGaleryPage),
  ],
})
export class TokenGaleryPageModule {}
