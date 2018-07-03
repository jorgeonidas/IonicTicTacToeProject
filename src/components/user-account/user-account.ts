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

  constructor() {
    console.log('Hello UserAccountComponent Component');
    this.profileImgUlr = 'assets/imgs//user.png'//Obviamente esto cargara luego de un servicio
  }

}
