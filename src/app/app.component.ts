import { Component } from '@angular/core';
import { Platform, Events, IonicApp} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MainMenuPage } from '../pages/main-menu/main-menu';
import { LoginPage } from '../pages/login/login';
import { ConfigurationServiceDB } from '../services/configurationdb.service';
import { ConfigurationModel } from '../models/configuration';
import { ConfigurationPage } from '../pages/settings-menu/configuration/configuration';
import { ContactsPage } from '../pages/contacts/contacts';
import { TokenStorePage } from '../pages/token-store/token-store';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  loginPage = LoginPage;
  mainMenuPage = MainMenuPage;
  cfgPageText= ConfigurationPage;
  contactsPage = ContactsPage;
  storePage = TokenStorePage;
  //pagina root
  rootPage: any = this.mainMenuPage;
  
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
    });
    
    statusBar.hide();
    this.getSettingsFromDB();

  
    }

    getSettingsFromDB(){
      this.cfgServiceDB.get('sfx').then((val) => {
        console.log(val);
        this.configModel.setSfx(val);
        //this.sfx = this.configModel.sfx;
        this.events.publish('settings:changed');
  
      });
  
      this.cfgServiceDB.get('music').then((val) => {
        console.log(val);
        this.configModel.setMusic(val);
        //this.music = this.configModel.music;
        this.events.publish('settings:changed');
  
      });
  
      this.cfgServiceDB.get('currentLang').then((val) => {
        console.log(val);
        this.configModel.setlanguage(val);
        //this.currentLang = this.configModel.language;
        this.events.publish('settings:changed');
  
      });
  
      this.cfgServiceDB.get('notifications').then((val) => {
        console.log(val);
        this.configModel.setNotif(val);
        //this.notifications = this.configModel.notifications;
        this.events.publish('settings:changed');
      });


  }



}



