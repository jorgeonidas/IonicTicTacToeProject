import { Component } from '@angular/core';
import { Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MainMenuPage } from '../pages/main-menu/main-menu';
import { LoginPage } from '../pages/login/login';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  loginPage = LoginPage;
  mainMenuPage = MainMenuPage;
  //pagina root
  rootPage: any = this.mainMenuPage;
  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen) { }

}

