import { Component } from '@angular/core';

@Component({
  selector: 'ranking-statistics',
  templateUrl: 'ranking-statistics.html'
})
export class RankingStatisticsComponent {

  text: string;
  rankingUris: string[];

  constructor() {
    console.log('Hello RankingStatisticsComponent Component');
    this.text = 'Hello World';

    this.rankingUris = [
        'assets/imgs/medal-icon.png',
        'assets/imgs/medal-icon.png',
        'assets/imgs/medal-icon.png',
        'assets/imgs/medal-icon.png',
        'assets/imgs/medal-icon.png',
        'assets/imgs/medal-icon.png',
        'assets/imgs/medal-icon.png',
        'assets/imgs/medal-icon.png',
        'assets/imgs/medal-icon.png'
      ];
  }

}
