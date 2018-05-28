import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { MainMenuPage } from '../pages/main-menu/main-menu';
import { CreateAccountPage } from '../pages/create-account/create-account';
import { SettingsMenuPage } from '../pages/settings-menu/settings-menu';
import { ImportantInfoPage } from '../pages/settings-menu/importatn-info/important-info';
import { AboutInfoPage } from '../pages/settings-menu/about-info/about-info';
import { ConfigurationPage } from '../pages/settings-menu/configuration/configuration';
import { ConfigurationService } from '../services/configuration.service';
import { HttpClientModule } from '@angular/common/http';

import { IonicStorageModule } from '@ionic/storage';
import { CharacterSelectionPage } from '../pages/character-selection/character-selection';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    MainMenuPage,
    CreateAccountPage,
    SettingsMenuPage,
    ImportantInfoPage,
    AboutInfoPage,
    CharacterSelectionPage,
    ConfigurationPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    MainMenuPage,
    CreateAccountPage,
    SettingsMenuPage,
    ImportantInfoPage,
    AboutInfoPage,
    CharacterSelectionPage,
    ConfigurationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConfigurationService
  ]
})
export class AppModule {}
