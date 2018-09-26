import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { TokenService } from '../../services/tokenService';
import { Platform } from 'ionic-angular';
import { platformCoreDynamic } from '@angular/platform-browser-dynamic/src/platform_core_dynamic';
import { AdmobServiceProvider } from '../../providers/admob-service/admob-service';

@IonicPage()
@Component({
  selector: 'page-token-store',
  templateUrl: 'token-store.html',
})
export class TokenStorePage {

  currentToken: string;
  maxPerPage: number = 6; //maximo de 6 por pagina
  maxPerPageIphoneX: number = 9; //maximo de 9 por pagina
  tokensUris: string[];
  iphonex: boolean;
  deviceHeight: number;
  isIos: boolean;

  constructor(platform: Platform,
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private tokenService: TokenService, 
    private admob:AdmobServiceProvider,
    private events : Events) {
    //obtener altura del telefono
    this.deviceHeight = platform.height();
    this.iphonex = this.isIphoneX(platform.height(), platform.width(), platform.is('ios'));

    //maximo de paginacion dependiendo del la altura del dispositivo
    if(this.iphonex || platform.height() >= 800){
      this.tokensUris = new Array(this.maxPerPageIphoneX);
      console.log(this.tokensUris.length);
    }else{
      this.tokensUris = new Array(this.maxPerPage);
      console.log(this.tokensUris.length);
    }

    this.currentToken = tokenService.getTokens()[0];
    for(let i = 0; i< this.tokensUris.length; i++){
      this.tokensUris[i] = tokenService.getTokens()[i];
    }
    console.log(this.tokensUris);

    
   /* this.events.subscribe('interstitialFail: true',()=>{
      this.navCtrl.pop({animate : false});
    });*/

  //preparando ad
    platform.ready().then(()=>{
      //prepara y muestra add
      this.admob.prepareInterstitialAd();
  
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad');
    //this.admob.hidddeBanner();
  }

  backToMainMenu(){
    //si no es un navegador
    if(this.admob.cordovaAviable){
      //si la publicidad no falla en cargar
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
    //
  }

  isIphoneX(h : number, w: number,p: boolean): boolean{
    let isX = false;
    if(h == 812 && w == 375 && p == true){
      isX = true;
    }

    return isX;
  }
}
