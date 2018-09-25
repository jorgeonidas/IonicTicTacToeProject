import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, MenuController, Platform } from 'ionic-angular';
import { SettingsMenuPage } from '../settings-menu/settings-menu';
import { CharacterSelectionPage } from '../character-selection/character-selection';
import { PlayerSelectorService } from '../../services/playerSelService';
import { ContactsPage } from '../contacts/contacts';
import { TokenStorePage } from '../token-store/token-store';
import { AdmobServiceProvider } from '../../providers/admob-service/admob-service';


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

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private popoverCtrl: PopoverController,
              private menuCtrl: MenuController,
              private playerSelService: PlayerSelectorService,
              private admob: AdmobServiceProvider, 
              private platfom : Platform
              ) {
              
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
    
    if(selected == 'singleplayer')
      this.playerSelService.setSinglePlayer(true);
    //le aviso al servicio que ya no es la primera vez que despliego el main menu
    this.admob.firstTimeLaunched = false;
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
    /*this.admob.showVideoAdd().onAdDismiss().subscribe(()=>{
      this.admob.dismissLoader();
      console.log("you win free energy");
      
    }, error=>{
      this.admob.dismissLoader();
      console.log(error);
    });*/
  }

}
