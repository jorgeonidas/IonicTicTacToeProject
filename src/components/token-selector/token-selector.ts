import { Component } from '@angular/core';

@Component({
  selector: 'token-selector',
  templateUrl: 'token-selector.html'
})
export class TokenSelectorComponent {

  text: string;
  playerOneToken = 'O';
  playerTwoOrBotToken = 'X';
  
  constructor() {
    console.log('Hello TokenSelectorComponent Component');
    this.text = 'Hello World';
  }

}
