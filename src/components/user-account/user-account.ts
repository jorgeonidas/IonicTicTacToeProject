import { Component } from '@angular/core';

@Component({
  selector: 'user-account',
  templateUrl: 'user-account.html'
})
export class UserAccountComponent {

  text: string;

  constructor() {
    console.log('Hello UserAccountComponent Component');
    this.text = 'Hello USER!';
  }

}
