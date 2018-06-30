import { Component } from '@angular/core';
import { PopoverController } from 'ionic-angular';
import { TokenGaleryPage } from '../../pages/token-galery/token-galery';


@Component({
  selector: 'token-selector-bar',
  templateUrl: 'token-selector-bar.html'
})
export class TokenSelectorBarComponent {

  playerOneToken = 'O';
  playerTwoOrBotToken = 'X';

  constructor(private popoverCtrl: PopoverController) {
    console.log('Hello TokenSelectorBarComponent Component');
  }

  onDeployTokenSelector(){
    console.log("clicked: onDeployTokenSelector ");
    const popover = this.popoverCtrl.create(TokenGaleryPage);
    popover.present();
  }


}
