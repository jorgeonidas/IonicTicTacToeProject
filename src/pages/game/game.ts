import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {
  gameData: any;
  gametype: string = 'local-';
  rounds: number = 1;
  difficulty: string = 'easy';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.gameData = this.navParams.data;
    console.log(this.gameData);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamePage');
  }

}
