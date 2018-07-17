import { Component } from '@angular/core';

@Component({
  selector: 'important-information',
  templateUrl: 'important-information.html'
})
export class ImportantInformationComponent {

  text: string;

  constructor() {
    console.log('Hello ImportantInformationComponent Component');
    this.text = 'Hello World';

  
  }

}
