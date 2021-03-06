import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdMobPro, AdMobOptions } from '@ionic-native/admob-pro';
import { Platform, LoadingController, Events} from 'ionic-angular';
import * as Constants from '../../services/Constants';

@Injectable()
export class AdmobServiceProvider {
  adIdinterstetial : string;
  adIdVideo: string;
 /* private iosInter = 'ca-app-pub-2497464044902615/8130698049';
  private androidInter = 'ca-app-pub-2497464044902615/3469398308';

  private iosVid = 'ca-app-pub-2497464044902615/1296151797';
  private androidVid='ca-app-pub-2497464044902615/2902970831';
  */
  adProb : number;
  public cordovaAviable: boolean;
  public firstTimeLaunched: boolean;
  public videoRewardShowed : boolean;
  public isEnergyClaimPage : boolean;


  private loading : any;
  private adInterstitialOpt : AdMobOptions;
  private adVideoRewardOpt: AdMobOptions;

  //fail case 
  failToLoadInterstitial : boolean;
  failToLoadVieoReward : boolean;

  //Must show add?
  isMusShowAdd: boolean;

  constructor(public http: HttpClient, private admob: AdMobPro, private platform: Platform,
    public loadingCtrl: LoadingController, private events : Events) {
    this.firstTimeLaunched = true;
    this.videoRewardShowed = false;

    this.failToLoadInterstitial = false;
    this.failToLoadVieoReward = false;
    
    this.isMusShowAdd = true;

    this.isEnergyClaimPage = false;
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

  setIsMustShowAdd(){
    this.setAdProb();

    if(this.getAdProb() <= Constants.AD_ODD){
      this.isMusShowAdd = true;
    }else{
      this.isMusShowAdd = false;
    }
    console.log("Must show add?");
    console.log(this.isMusShowAdd);
  }

  getIsMusShowAdd(){
    return this.isMusShowAdd;
  }

  getAdProb(){
    return this.adProb;
  }
  //CONFIGURO LAS OPCIONES DE CADA TIPO DE PUBLICIDAD DEPENDIENDO DE LA PLATAFORMA
  setAdmobOptions(){
    //android o ios}
    console.log("Configurando dependiendo de la plataforma");
    
    if(this.platform.is('android')) {
      this.adIdinterstetial  = Constants.ANDROID_INTER_ID;
      this.adIdVideo = Constants.ANDROID_VIDEO_ID;
    } else if (this.platform.is('ios')) {
      this.adIdinterstetial = Constants.IOS_INTER_ID;
      this.adIdVideo = Constants.IOS_VIDEO_ID;
    }

    this.adInterstitialOpt = {
      adId : this.adIdinterstetial,
      isTesting: true,
      autoShow : false
    };

    this.adVideoRewardOpt = {
      adId: this.adIdVideo,
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

    this.admob.onAdLoaded().subscribe(()=>{
      console.log('videoReward cargado con exito ahora vamos a mostrarlo!');
      console.log("current page");
      console.log(this.isEnergyClaimPage);
      //CASO ESPECIAL PAGINA QUE MUESTRA ADD PARA RECLAMAR ENERGIA
      if(this.isEnergyClaimPage)
        this.events.publish('vrloaded:true');
      
    });

    this.admob.onAdFailLoad().subscribe((data)=>{
      console.log('Fail to load Video Add');
      //this.events.publish('videoAdFail: true');
      this.failToLoadVieoReward = true;
      console.log(data);
      
      if(this.isEnergyClaimPage)
        this.events.publish('vrFailLoad:true'); 
    });
    //CASO ESPECIAL PAGINA QUE MUESTRA ADD PARA RECLAMAR ENERGIA
    this.admob.prepareRewardVideoAd(this.adVideoRewardOpt).then((data) => {
      console.log("exito al cargar video add", data);
      this.failToLoadVieoReward = false;//no fallo al cargar el video reward
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

    this.admob.showInterstitial();


    return this.admob;
  }

  showVideRewardAdd(){
    if (AdMobPro) {
      this.admob.showRewardVideoAd();
    }
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
