import { Component } from '@angular/core';
@Component({
  selector: 'information-bar',
  templateUrl: 'information-bar.html'
})
export class InformationBarComponent {

  nickname: string;
  coins: number;
  eolas: number;

  coinIconUrl = "assets/imgs/coins.png";
  eolaIconUrl = "assets/imgs/eolas.png";

  constructor() {
    console.log('Hello InformationBarComponent Component');
    this.nickname = 'human';
    this.coins = 9999;
    this.eolas = 9999;

  }

}
