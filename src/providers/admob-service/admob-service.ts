import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdMobPro, AdMobOptions } from '@ionic-native/admob-pro';
import { Platform, LoadingController, Events} from 'ionic-angular';

@Injectable()
export class AdmobServiceProvider {
  adIdinterstetial : string;
  adIdVideo: string;
  private iosInter = 'ca-app-pub-2497464044902615/8130698049';
  private androidInter = 'ca-app-pub-2497464044902615/3469398308';

  private iosVid = 'ca-app-pub-2497464044902615/1296151797';
  private androidVid='ca-app-pub-2497464044902615/2902970831';

  adProb : number;
  public cordovaAviable: boolean;
  public firstTimeLaunched: boolean;
  public videoRewardShowed : boolean;
  private loading : any;
  private adInterstitialOpt : AdMobOptions;
  private adVideoRewardOpt: AdMobOptions;

  constructor(public http: HttpClient, private admob: AdMobPro, private platform: Platform,
    public loadingCtrl: LoadingController, private events : Events) {
    this.firstTimeLaunched = true;
    this.videoRewardShowed = false;
    //si las funciones de cordova estan disponibles
    if(this.platform.is('cordova')){
      this.cordovaAviable= true;
    }else{
      this.cordovaAviable = false;
    }
    
    platform.ready().then(()=>{
      //android o ios
      if(this.platform.is('android')) {
        this.adIdinterstetial  = this.androidInter;
        this.adIdVideo =this.androidVid;
      } else if (this.platform.is('ios')) {
        this.adIdinterstetial = this.iosInter;
        this.adIdVideo = this.iosVid;
      }

      this.adInterstitialOpt = {
        //adId : this.adIdinterstetial
        isTesting: true,
        autoShow : true
      };

      this.adVideoRewardOpt = {
        //adId: this.adIdVideo,
        isTesting: true,
        autoShow: true
      }
      

    });  
    
  }

  setAdProb(){
    this.adProb = Math.random();
  }

  getAdProb(){
    return this.adProb;
  }

  showInterstitialAdd(){

    this.admob.onAdFailLoad().subscribe((data)=>{
      console.log('Fail to load Interstitial');
      
      console.log(data); 
    });
    /*
    const interstitialopt : AdMobOptions = {
      //adId: this.adIdinterstetial,
      isTesting : true,
      autoShow: true
    };*/
    this.admob.prepareInterstitial(this.adInterstitialOpt).then(()=>{},error=>{
      if(this.platform.is('ios')){
        //WORKAROUND IOS?
        this.events.publish('videoAdFail: true');
      }
    });
    return this.admob;
  }

  showVideoAdd(){
    //Si no es IOS
    this.presentLoaderSpinner();

      //listener para cuando la publicidad falla
      this.admob.onAdFailLoad().subscribe((data) => {
        console.log('Fail to load Video');
        console.log(data);
        this.dismissLoader(); 
        this.events.publish('videoAdFail: true');
      });
      /*
      const videopt: AdMobOptions = {
        //adId: this.adIdVideo,
        isTesting: true,
        autoShow: true
      };
      */
      this.admob.prepareRewardVideoAd(this.adVideoRewardOpt).then((data) => {
        console.log(data);
        //loading.dismiss(); 
      },
        error => {
          //loading.dismiss();
          //this.events.publish('videoAdFail: true');
          console.log(error);
          //this.dismissLoader();
        });

    
    return this.admob;
    
  }

  presentLoaderSpinner(){
    this.loading = this.loadingCtrl.create({ content: 'Please Wait...' });
    this.loading.present();
  }

  dismissLoader(){
    this.loading.dismiss();
  }
 

}
