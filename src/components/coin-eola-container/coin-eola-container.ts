import { Component, Input } from '@angular/core';

@Component({
  selector: 'coin-eola-container',
  templateUrl: 'coin-eola-container.html'
})
export class CoinEolaContainerComponent {

  @Input() currencyAmmnt: number;
  @Input() currencyIcon: string;

  constructor() {
    this.currencyAmmnt = 9999;
    this.currencyIcon = "assets/imgs/coins.png";
  }

}
