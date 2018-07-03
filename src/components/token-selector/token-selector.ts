import { Component } from '@angular/core';
@Component({
  selector: 'token-selector',
  templateUrl: 'token-selector.html'
})
export class TokenSelectorComponent {

  tokensUrls: string[];
  currentInspectIndex: number;
  constructor() {
    console.log('Hello TokenSelectorComponent Component');
    this.tokensUrls = 
                    [
                      'assets/imgs/Tic-Tac-Toe-icon-mockup.ico',
                      'assets/imgs/Tic-Tac-Toe-icon-mockup.ico',
                      'assets/imgs/Tic-Tac-Toe-icon-mockup.ico',
                      'assets/imgs/Tic-Tac-Toe-icon-mockup.ico',
                      'assets/imgs/Tic-Tac-Toe-icon-mockup.ico',
                      'assets/imgs/Tic-Tac-Toe-icon-mockup.ico',
                      'assets/imgs/Tic-Tac-Toe-icon-mockup.ico',
                      'assets/imgs/Tic-Tac-Toe-icon-mockup.ico',
                      'assets/imgs/Tic-Tac-Toe-icon-mockup.ico'
                    ];
  }

  inspect(index: number){
    console.log("token index: " + index);
    this.currentInspectIndex = index;
  }

}
