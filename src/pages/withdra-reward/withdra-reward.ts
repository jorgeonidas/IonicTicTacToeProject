import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the WithdraRewardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-withdra-reward',
  templateUrl: 'withdra-reward.html',
})
export class WithdraRewardPage {

  reward: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WithdraRewardPage');
    //this.reward = this.navParams.get('reward');
    console.log("recieved",this.reward)
  }

}
