import { Component } from '@angular/core';
import { PopoverController } from 'ionic-angular';
import { TokenGaleryPage } from '../../pages/token-galery/token-galery';
@Component({
  selector: 'token-selector',
  templateUrl: 'token-selector.html'
})
export class TokenSelectorComponent {

  text: string;
  playerOneToken = 'O';
  playerTwoOrBotToken = 'X';

  constructor(private popoverCtrl: PopoverController) {
    console.log('Hello TokenSelectorComponent Component');
    this.text = 'Hello World';
  }

  onDeployTokenSelector(){
    console.log("clicked: onDeployTokenSelector ");
    const popover = this.popoverCtrl.create(TokenGaleryPage);
    popover.present();
  }

}
