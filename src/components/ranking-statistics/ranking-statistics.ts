import { Component } from '@angular/core';

@Component({
  selector: 'ranking-statistics',
  templateUrl: 'ranking-statistics.html'
})
export class RankingStatisticsComponent {

  text: string;

  constructor() {
    console.log('Hello RankingStatisticsComponent Component');
    this.text = 'Hello World';
  }

}
