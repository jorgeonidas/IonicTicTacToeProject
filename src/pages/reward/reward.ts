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

  
  private weights = [0.02, 0.13, 0.11, 0.13, 0.07, 0.13, 0.08, 0.13, 0.07, 0.13]; // probabilidades
  private results = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; //valores a retornar
  
  spin(){
    let index = this.generateIndex();
    console.log(index);
    
  }

  generateIndex(){
    var num = Math.random(),
        s = 0,
        lastIndex = this.weights.length - 1;

    for (var i = 0; i < lastIndex; ++i) {
        s += this.weights[i];
        if (num < s) {
            return this.results[i];
        }
    }

    return this.results[lastIndex];
  }

}
