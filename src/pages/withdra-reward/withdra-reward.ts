import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MainMenuPage } from '../main-menu/main-menu';

@IonicPage()
@Component({
  selector: 'page-withdra-reward',
  templateUrl: 'withdra-reward.html',
})
export class WithdraRewardPage {

  reward: string;
  gitImgUri : string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WithdraRewardPage');
    this.reward = this.navParams.get('reward');
    //console.log("recieved",this.reward);
    this.reward = "YOU WON "+this.reward.toUpperCase()+"!!!";
    this.gitImgUri = 'assets/imgs/reward-img.png';
    
    //for testing
    this.reward = "YOU WON A MILLION EOLAS!!!";
  }

  toMainMenu(){
    console.log("pop to main menu");
    
    //this.navCtrl.push(MainMenuPage);//despues lo haremos solo con pop por ahora es de manera demostrativa
    //this.navCtrl.pop(); pop to main menu!
  }
}
