import { Component } from '@angular/core';
import { Platform, Events, IonicApp} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import {Keyboard} from '@ioni'
import { MainMenuPage } from '../pages/main-menu/main-menu';
import { LoginPage } from '../pages/login/login';
import { ConfigurationServiceDB } from '../services/configurationdb.service';
import { ConfigurationModel } from '../models/configuration';
import { ConfigurationPage } from '../pages/settings-menu/configuration/configuration';
import { ContactsPage } from '../pages/contacts/contacts';
import { TokenStorePage } from '../pages/token-store/token-store';
import { RewardPage } from '../pages/reward/reward';
import { GamePage } from '../pages/game/game';
import { WithdraRewardPage } from '../pages/withdra-reward/withdra-reward';
import { CreateAccountPage } from '../pages/create-account/create-account';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  createAccPage = CreateAccountPage;
  withdrawRedPage = WithdraRewardPage;
  loginPage = LoginPage;
  mainMenuPage = MainMenuPage;
  cfgPageText= ConfigurationPage;
  contactsPage = ContactsPage;
  storePage = TokenStorePage;
  rewardPage = RewardPage;
  gamePage = GamePage;
  //pagina root
  rootPage: any = this.loginPage;
  
  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private cfgServiceDB: ConfigurationServiceDB,
    private configModel: ConfigurationModel,
    private events: Events) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      splashScreen.hide();
      statusBar.isVisible = false;
      statusBar.hide();
      //statusBar.styleDefault();

    });
    
    //statusBar.hide(); //probando si funciona en startup
    this.getSettingsFromDB();
    }

    getSettingsFromDB(){
      this.cfgServiceDB.get('sfx').then((val) => {
        console.log('sfx',val);
        
        if(val != null)
          this.configModel.setSfx(val);
        else{
          console.log("null field");
          this.cfgServiceDB.set('sfx',true);
          this.configModel.setSfx(true);
        }
              
        //this.sfx = this.configModel.sfx;
        this.events.publish('settings:changed');
  
      });
  
      this.cfgServiceDB.get('music').then((val) => {
        console.log('music',val);
        if(val != null)
          this.configModel.setMusic(val);
        else{
          console.log("null field");
          this.cfgServiceDB.set('music',true);
          this.configModel.setMusic(true);
        }
        this.events.publish('settings:changed');
  
      });
  
      this.cfgServiceDB.get('language').then((val) => {
        console.log('language',val);
        if(val != null)
          this.configModel.setlanguage(val);
        else{
          console.log("null field");
          this.cfgServiceDB.set('language','English');
          this.configModel.setlanguage('English');
        }
        //this.currentLang = this.configModel.language;
        this.events.publish('settings:changed');
  
      });
  
      this.cfgServiceDB.get('notifications').then((val) => {
        console.log('notifications',val);
        if(val != null)
          this.configModel.setNotif(val);
        else{
          console.log("null field");
          this.cfgServiceDB.set('notifications',true);
          this.configModel.setNotif(true);
        }
        this.events.publish('settings:changed');
      });

  }



}



