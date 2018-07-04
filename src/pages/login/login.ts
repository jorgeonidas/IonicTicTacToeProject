import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MainMenuPage } from '../main-menu/main-menu';
import { CreateAccountPage } from '../create-account/create-account';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  mainMenuPage = MainMenuPage;
  createAccPage = CreateAccountPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  toMainMenuPage(){
    this.navCtrl.setRoot(MainMenuPage, {}, {animate: false});
    this.navCtrl.push(this.mainMenuPage, {}, {animate: false});
  }

  toCreateAccountPage(){
    this.navCtrl.push(this.createAccPage, {}, {animate: false});
  }
}
