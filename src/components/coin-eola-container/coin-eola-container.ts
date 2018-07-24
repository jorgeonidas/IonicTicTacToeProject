import { Component, Input } from '@angular/core';

@Component({
  selector: 'coin-eola-container',
  templateUrl: 'coin-eola-container.html'
})
export class CoinEolaContainerComponent {

  @Input() currencyAmmnt: number;
  @Input() currencyIcon: string;
  /*
  coinIconUrl = 'assets/imgs/coins.png';
  eolaIconUrl = 'assets/imgs/eolas.png';*/

  //asset: string;

  constructor() {
    //this.currencyIcon = "assets/imgs/coins.png";
  }


}
