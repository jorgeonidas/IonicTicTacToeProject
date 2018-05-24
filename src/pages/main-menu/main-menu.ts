import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { SettingsMenuPage } from '../settings-menu/settings-menu';

@IonicPage()
@Component({
  selector: 'page-main-menu',
  templateUrl: 'main-menu.html',
})
export class MainMenuPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private popoverCtrl: PopoverController ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainMenuPage');
  }

  onLoadSettingsMenu(){
    const popover= this.popoverCtrl.create(SettingsMenuPage);
    popover.present();
  }
}
