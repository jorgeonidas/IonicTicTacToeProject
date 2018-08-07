import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-reward',
  templateUrl: 'reward.html',
})
export class RewardPage {
  startAngle: number = 0;
  coinIconUrl: string;
  hardSpinnerUri: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.coinIconUrl = "assets/imgs/coins.png";
    this.hardSpinnerUri = "assets/imgs/RuletaBG.png"
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RewardPage');
  }

  startRoulette(){
    
  }

}
