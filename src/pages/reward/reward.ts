import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-reward',
  templateUrl: 'reward.html',
})
export class RewardPage {

  coinIconUrl: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.coinIconUrl = "assets/imgs/coins.png";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RewardPage');
  }

}
