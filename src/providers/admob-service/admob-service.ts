import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdMobPro, AdMobOptions } from '@ionic-native/admob-pro';
import { Platform, LoadingController} from 'ionic-angular';

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
  constructor(public http: HttpClient, private admob: AdMobPro, private platform: Platform,
    public loadingCtrl: LoadingController) {
    //si las funciones de cordova estan disponibles
    if(this.platform.is('cordova')){
      this.cordovaAviable= true;
    }else{
      this.cordovaAviable = false;
    }

    //android o ios
      if(this.platform.is('android')) {
        this.adIdinterstetial  = this.androidInter;
        this.adIdVideo =this.androidVid;
      } else if (this.platform.is('ios')) {
        this.adIdinterstetial = this.iosInter;
        this.adIdVideo = this.iosVid;
      }

  }

  setAdProb(){
    this.adProb = Math.random();
  }

  getAdProb(){
    return this.adProb;
  }

  showInterstitialAdd(){
    const interstitialopt : AdMobOptions = {
      //adId: this.adIdinterstetial;
      isTesting : true,
      autoShow: true
    };
    this.admob.prepareInterstitial(interstitialopt);
    return this.admob;
  }

  showVideoAdd(){
    const loading = this.loadingCtrl.create({ content: 'Please Waint...' });
    loading.present();
    const videopt: AdMobOptions = {
      //adId: this.adIdVideo,
      isTesting: true,
      autoShow: true
    };
    this.admob.prepareRewardVideoAd(videopt).then(()=>{ loading.dismiss(); },
      error=>{
        loading.dismiss();
        console.log(error);
    });
    return this.admob;
  }

 

}




/*
  hidddeBanner(){
    this.admob.hideBanner();
  }
*/
/*
  async showBanner(){
    const options : AdMobOptions = {
      //adId: this.adId;
      isTesting: true,
      autoShow: true,

    }
    this.admob.createBanner(options);
  }
*/
