import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, MenuController, Platform, ViewController } from 'ionic-angular';
import { SettingsMenuPage } from '../settings-menu/settings-menu';
import { CharacterSelectionPage } from '../character-selection/character-selection';
import { PlayerSelectorService } from '../../services/playerSelService';
import { ContactsPage } from '../contacts/contacts';
import { TokenStorePage } from '../token-store/token-store';
import { AdmobServiceProvider } from '../../providers/admob-service/admob-service';

import * as Constants from '../../services/Constants'

@IonicPage()
@Component({
  selector: 'page-main-menu',
  templateUrl: 'main-menu.html',
})
export class MainMenuPage {

  activeMenu: string; //menu a activar
  isSettingsActive: boolean = false;
  isLoginActive: boolean = false;
  sideMenuOpen: boolean;

  /*SVG IMAGES RESOURCES*/
  singlePlayerBtnImg = Constants.BTN_1_PLAYER_NORMAL;
  localMultiplayerBtnImg = Constants.BTN_2_PLAYERS_NORMAL;
  multiplauyerBtnImg = Constants.BTN_MULTIPLAYER_NORMAL;

  //for testing
  platFormReadyOnce;
  constructor(public navCtrl: NavController, 
              public viewCtrl: ViewController,
              public navParams: NavParams,
              private popoverCtrl: PopoverController,
              private playerSelService: PlayerSelectorService,
              private admob: AdmobServiceProvider, 
              private platfom : Platform
              ) {
                this.platFormReadyOnce = false;
               /* this.platfom.ready().then(()=>{
                  //prepara y muestra add
                  this.platFormReadyOnce = true;
                  this.admob.prepareVideoAdd();
              
                });*/
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainMenuPage');
    this.sideMenuOpen = false;    
  }

  ionViewWillEnter(){
    
    console.log("FTL:",this.admob.firstTimeLaunched);
   /* if (!this.admob.firstTimeLaunched) {
      if(this.admob.videoRewardShowed == false){ //si no vio video reward muestra 
        this.admob.setAdProb();
        //ver publicidad
        if (this.admob.getAdProb() <= 0.85 && this.admob.cordovaAviable) {
          this.admob.showInterstitialAdd();
        }
      }else{//si vio video reward setear a false para mostrar interstitial la proxima vez
        this.admob.videoRewardShowed = false;
      }
      
    }*/
  }

  onLoadSettingsMenu(){
    const popover= this.popoverCtrl.create(SettingsMenuPage);
    popover.present();
  }

  onGameSelectio(selected: string){
    this.playerSelService.setSinglePlayer(false);
    
    if(selected == Constants.GT_SINGLEPLAYER)
      this.playerSelService.setSinglePlayer(true);
    //le aviso al servicio que ya no es la primera vez que despliego el main menu
    this.admob.firstTimeLaunched = false;
    this.navCtrl.push(CharacterSelectionPage, {selection: selected}, {animate: false});
  }
 
  openContacsPage(){
    //le aviso al servicio que ya no es la primera vez que despliego el main menu
    this.admob.firstTimeLaunched = false;
    this.navCtrl.push(ContactsPage,{},{animate: false});
  }

  openStorePage(){
    //le aviso al servicio que ya no es la primera vez que despliego el main menu
    this.admob.firstTimeLaunched = false;
    this.navCtrl.push(TokenStorePage,{},{animate: false});
  }
  
  toggleFade(open: boolean){
    this.sideMenuOpen = open;
  }

  getFreeEnergy(){
    if(this.admob.cordovaAviable){
      /*
      this.admob.showVideRewardAdd().onAdDismiss().subscribe(()=>{
        this.reloadAftherAdd();
      },
      e=>{
        console.log(e);
      });*/
      this.navCtrl.push("EnergyClaimPage",{},{animate: false});
    }

  }

  reloadAftherAdd(){
    //let index = this.navCtrl.getActive().index;
    this.navCtrl.push(this.navCtrl.getActive().component,{},{animate: false}).then(() => {
      let index = this.viewCtrl.index; 
      this.navCtrl.remove(index);
   })
  }

}
