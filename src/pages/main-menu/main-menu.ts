import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, MenuController } from 'ionic-angular';
import { SettingsMenuPage } from '../settings-menu/settings-menu';
import { CharacterSelectionPage } from '../character-selection/character-selection';

@IonicPage()
@Component({
  selector: 'page-main-menu',
  templateUrl: 'main-menu.html',
})
export class MainMenuPage {

  activeMenu: string; //menu a activar
  isSettingsActive: boolean = false;
  isLoginActive: boolean = false;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private popoverCtrl: PopoverController,
              private menuCtrl: MenuController ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainMenuPage');
  }

  onLoadSettingsMenu(){
    const popover= this.popoverCtrl.create(SettingsMenuPage);
    popover.present();
  }

  onGameSelectio(selected: string){
    this.navCtrl.push(CharacterSelectionPage, {selection: selected}, {animate: false});
  }
  //activar menuSettings
  menuSettingsActive(){
    this.isSettingsActive = !this.isSettingsActive;
    this.activeMenu = 'settings' //los ids de cada menu estan en app.html
    this.menuCtrl.enable(true, 'settings');
    this.menuCtrl.enable(false, 'login');
    this.menuCtrl.enable(false,'importantInfo');
    this.menuCtrl.open(this.activeMenu);
  }

  menuLoginActive(){
    this.activeMenu = 'login'
    this.menuCtrl.enable(true, 'login');
    this.menuCtrl.enable(false, 'settings');
    this.menuCtrl.enable(false,'importantInfo');
    this.menuCtrl.open(this.activeMenu);
  }

  menuImportantInfo(){
    this.activeMenu='importantInfo';
    this.menuCtrl.enable(true,'importantInfo');
    this.menuCtrl.enable(false, 'login');
    this.menuCtrl.enable(false, 'settings');
    this.menuCtrl.open(this.activeMenu);
  }
  
}
