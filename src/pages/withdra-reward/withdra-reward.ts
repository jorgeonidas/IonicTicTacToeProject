import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events, Platform } from 'ionic-angular';
import { MainMenuPage } from '../main-menu/main-menu';
import { AdmobServiceProvider } from '../../providers/admob-service/admob-service';

@IonicPage()
@Component({
  selector: 'page-withdra-reward',
  templateUrl: 'withdra-reward.html',
})
export class WithdraRewardPage {

  reward: string;
  gitImgUri : string;
  pressed: boolean;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private admob: AdmobServiceProvider,
              private events : Events,
              private loadingCtrl : LoadingController,
              private platform : Platform
              ) {

                this.events.subscribe('videoAdFail: true',()=>{
                  this.navCtrl.pop({animate : false});
                });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WithdraRewardPage');
    this.reward = this.navParams.get('reward');
    //console.log("recieved",this.reward);
    this.reward = "YOU WON "+this.reward.toUpperCase()+"!!";
    this.gitImgUri = 'assets/imgs/reward-img.png';
    this.pressed = false;
    //for testing
    //this.reward = "YOU WON A MILLION EOLAS!!!";
  }

  toMainMenu(){
    console.log("pop to main menu");
    this.pressed = true;
    this.admob.videoRewardShowed = false;
    this.navCtrl.pop({animate : false});

  }

  doubleReward(){
    this.pressed = true;
    console.log("cordova aviable?",this.admob.cordovaAviable);
    
    if(this.admob.cordovaAviable){
        this.admob.showVideoAdd().onAdDismiss().subscribe((data) => {
          console.log("reward dissmiss");
          console.log(data);
          this.admob.dismissLoader();
          this.admob.videoRewardShowed = true;
          this.navCtrl.pop({ animate: false });
        }, error => {
          console.log(error);
          this.admob.dismissLoader();
          this.admob.videoRewardShowed = false;
          this.navCtrl.pop({ animate: false });
        }
        );
      
      }else{
      this.navCtrl.pop({ animate: false });
    }  
  }
}
