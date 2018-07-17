import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, MenuController, Platform } from 'ionic-angular';
import { SettingsMenuPage } from '../settings-menu/settings-menu';
import { CharacterSelectionPage } from '../character-selection/character-selection';
import { PlayerSelectorService } from '../../services/playerSelService';
import { ContactsPage } from '../contacts/contacts';
import { TokenStorePage } from '../token-store/token-store';


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
              private menuCtrl: MenuController,
              private playerSelService: PlayerSelectorService,
              ) {

               
              
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainMenuPage');
  }

  onLoadSettingsMenu(){
    const popover= this.popoverCtrl.create(SettingsMenuPage);
    popover.present();
  }

  onGameSelectio(selected: string){
    this.playerSelService.setSinglePlayer(false);
    
    if(selected == 'singleplayer')
      this.playerSelService.setSinglePlayer(true);

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
    console.log("login clicked");
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

  openContacsPage(){
    this.navCtrl.push(ContactsPage,{},{animate: false});
  }

  openStorePage(){
    this.navCtrl.push(TokenStorePage,{},{animate: false});
  }
  
}
