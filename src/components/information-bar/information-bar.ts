import { Component } from '@angular/core';
@Component({
  selector: 'information-bar',
  templateUrl: 'information-bar.html'
})
export class InformationBarComponent {

  nickname: string;
  crystals: number;
  eolas: number;

  constructor() {
    console.log('Hello InformationBarComponent Component');
    this.nickname = 'human';
    this.crystals = 9999;
    this.eolas = 9999;

  }

}
