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

  //fail case 
  failToLoadInterstitial : boolean;
  failToLoadVieoReward : boolean;

  constructor(public http: HttpClient, private admob: AdMobPro, private platform: Platform,
    public loadingCtrl: LoadingController, private events : Events) {
    this.firstTimeLaunched = true;
    this.videoRewardShowed = false;

    this.failToLoadInterstitial = false;
    this.failToLoadVieoReward = false;

    //si las funciones de cordova estan disponibles
    if(this.platform.is('cordova')){
      this.cordovaAviable= true;
    }else{
      this.cordovaAviable = false;
    }
    
  }

  setAdProb(){
    this.adProb = Math.random();
  }

  getAdProb(){
    return this.adProb;
  }
  //CONFIGURO LAS OPCIONES DE CADA TIPO DE PUBLICIDAD DEPENDIENDO DE LA PLATAFORMA
  setAdmobOptions(){
    //android o ios}
    console.log("Configurando dependiendo de la plataforma");
    
    if(this.platform.is('android')) {
      this.adIdinterstetial  = this.androidInter;
      this.adIdVideo =this.androidVid;
    } else if (this.platform.is('ios')) {
      this.adIdinterstetial = this.iosInter;
      this.adIdVideo = this.iosVid;
    }

    this.adInterstitialOpt = {
      //adId : this.adIdinterstetial,
      isTesting: true,
      autoShow : false
    };

    this.adVideoRewardOpt = {
      //adId: this.adIdVideo,
      isTesting: true,
      autoShow: false
    }
  }

  //Pepare Ad Functions
  prepareInterstitialAd(){

    //seteo opciones
    this.setAdmobOptions();
    //evento en caso de que falle
    this.admob.onAdFailLoad().subscribe((data)=>{
      console.log('Fail to load Interstitial');
      //this.events.publish('interstitialFail: true');
      this.failToLoadInterstitial = true;    
      console.log(data); 
    });
    //preparo 
    this.admob.prepareInterstitial(this.adInterstitialOpt).then(()=>{
      console.log("exito al preparar ad");
      
    },error=>{
      //caso erroneo
      console.log(error);
      
    });

  }

  prepareVideoAdd(){
    this.setAdmobOptions();

    this.admob.onAdFailLoad().subscribe((data)=>{
      console.log('Fail to load Video Add');
      //this.events.publish('videoAdFail: true');
      this.failToLoadVieoReward = true;
      console.log(data); 
    });

    this.admob.prepareRewardVideoAd(this.adVideoRewardOpt).then((data) => {
      console.log("exito al cargar video add", data);
      //loading.dismiss(); 
    },
      error => {
        //loading.dismiss();
        //this.events.publish('videoAdFail: true');
        console.log(error);
        //this.dismissLoader();
      });

  }

  //show add functions
  showInterstitialAd(){
    if (AdMobPro) {
      this.admob.showInterstitial();
    }

    return this.admob;
  }

  showVideRewardAdd(){
    if (AdMobPro) {
      this.admob.showRewardVideoAd();
    }
  }

  /*
  showInterstitialAdd(){

    this.admob.onAdFailLoad().subscribe((data)=>{
      console.log('Fail to load Interstitial');
      
      console.log(data); 
    });

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
  */
  presentLoaderSpinner(){
    this.loading = this.loadingCtrl.create({ content: 'Please Wait...' });
    this.loading.present();
  }

  dismissLoader(){
    this.loading.dismiss();
  }
 


}
