import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TokenService } from '../../services/tokenService';
import { Platform } from 'ionic-angular';

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

  constructor(platform: Platform,public navCtrl: NavController, public navParams: NavParams, private tokenService: TokenService) {
    //obtener altura del telefono
    this.deviceHeight = platform.height();
    this.iphonex = this.deviceHeight > 800;
    console.log("device",this.deviceHeight, this.iphonex);
    //maximo de paginacion dependiendo del la altura del dispositivo
    if(this.iphonex){
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

    

    
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TokenStorePage');
  }

  backToMainMenu(){
    this.navCtrl.pop({animate:false});
  }
}
