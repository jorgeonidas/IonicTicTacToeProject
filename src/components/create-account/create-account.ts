import { Component } from '@angular/core';

/**
 * Generated class for the CreateAccountComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'create-account',
  templateUrl: 'create-account.html'
})
export class CreateAccountComponent {

  text: string;

  constructor() {
    console.log('Hello CreateAccountComponent Component');
    this.text = 'Hello World';
  }

}
