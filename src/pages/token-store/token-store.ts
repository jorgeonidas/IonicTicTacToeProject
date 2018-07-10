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

  constructor(public navCtrl: NavController, public navParams: NavParams, private tokenService: TokenService) {
    this.currentToken = tokenService.getTokens()[0];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TokenStorePage');
  }

  backToMainMenu(){
    this.navCtrl.pop({animate:false});
  }
}
