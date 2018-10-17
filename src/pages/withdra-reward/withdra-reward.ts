import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, /*LoadingController, Events, Platform*/} from 'ionic-angular';
import { MainMenuPage } from '../main-menu/main-menu';
import { AdmobServiceProvider } from '../../providers/admob-service/admob-service';
import { OriginatorService } from '../../services/originatorService';
import * as Constants from '../../services/Constants';
import { CareTakerService } from '../../services/CareTakerService';

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
              private originator : OriginatorService,
              private careTaker : CareTakerService,
              private events : Events//para actualizar la info bar
              //private events : Events,
              //private loadingCtrl : LoadingController,
              //private platform : Platform
              ) {
                /*
                this.admob.isEnergyClaimPage = false; //para avisar que no lance el evento
                this.platform.ready().then(()=>{
                  //prepara los ads
                  //this.platFormReadyOnce = true;
                  this.admob.prepareVideoAdd();
                  this.admob.prepareInterstitialAd();
              
                });
                */

                
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WithdraRewardPage');
    this.reward = this.navParams.get('reward');
    this.saveReward(this.reward);
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
    //this.navCtrl.pop({animate : false});
    if(this.admob.cordovaAviable){
      if(!this.admob.failToLoadInterstitial){
        this.admob.showInterstitialAd().onAdDismiss().subscribe(()=>{
          this.navCtrl.pop({animate:false});
        }, e =>{
          console.log(e);
          this.navCtrl.pop({animate:false});
          
        });
      }else{
        this.navCtrl.pop({animate:false});
      }
    }else{
      this.navCtrl.pop({animate:false});
    }
  }

  doubleReward(){
    this.pressed = true;
    if(this.admob.cordovaAviable){
      this.admob.presentLoaderSpinner();
      if(!this.admob.failToLoadVieoReward){
        this.admob.showVideRewardAdd().onAdDismiss().subscribe(()=>{
          //this.admob.dismissLoader();
          this.navCtrl.pop({ animate: false });
        },
        e=>{
          console.log(e);
          //this.admob.dismissLoader();
          this.navCtrl.pop({ animate: false });
        });
      }else{
        //this.admob.dismissLoader();
        this.navCtrl.pop({ animate: false });
      }
    }else{
      this.navCtrl.pop({ animate: false });
    }
   /* this.pressed = true;
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
    }  */
  }

  ionViewWillLeave(){
    console.log(this.originator.getState());
    
    if(this.admob.cordovaAviable)
      this.admob.dismissLoader();
  }

  saveReward(price: string){
    console.log("recieved",price);
    let rewardString = price.split(" ");
    console.log(rewardString);
    
    //separemos y casting a numeros
    let ammount = Number(rewardString[0]);
    let currency = rewardString[1];

    switch (currency) {
      case Constants.CRYSTALS:
          this.originator.updateCristals(ammount);
        break;
      
      case Constants.EOLA:
          this.originator.updateEolas(ammount);
        break;

      default:
        break;
    }
    this.careTaker.setState(this.originator.getMemento());
    this.events.publish('updateNick : done');

  }
}
