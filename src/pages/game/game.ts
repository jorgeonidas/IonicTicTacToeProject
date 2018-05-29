import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the GamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {
  gameData: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.gameData = this.navParams.data;
    console.log(this.gameData);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamePage');
  }

}
