import { Component } from '@angular/core';

@Component({
  selector: 'user-account',
  templateUrl: 'user-account.html'
})
export class UserAccountComponent {

  profileImgUlr: string;
  profileName: string;
  coins: number;
  eolas: number;

  coinIconUrl : string; 
  eolaIconUrl: string;
  

  constructor() {
    console.log('Hello UserAccountComponent Component');
    this.profileImgUlr = 'assets/imgs/user.png'//Obviamente esto cargara luego de un servicio
    this.coins = 9999;
    this.eolas = 9999;

    this.coinIconUrl = "assets/imgs/coins.png";
    this.eolaIconUrl = "assets/imgs/eolas.png";
  }

}
