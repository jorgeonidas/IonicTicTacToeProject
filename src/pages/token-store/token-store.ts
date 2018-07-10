import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TokenService } from '../../services/tokenService';
@IonicPage()
@Component({
  selector: 'page-token-store',
  templateUrl: 'token-store.html',
})
export class TokenStorePage {

  currentToken: string;
  maxPerPage: number = 6;
  tokensUris: string[] = new Array(this.maxPerPage);

  constructor(public navCtrl: NavController, public navParams: NavParams, private tokenService: TokenService) {
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
