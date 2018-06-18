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
import { AuthService } from '../services/authService';
import { GamePage } from '../pages/game/game';

import { ScoreboardComponent } from '../components/scoreboard/scoreboard.component';
import { GridSelectorComponent } from '../components/grid-selector/grid-selector.component';
import { GameBoardComponent } from '../components/game-board/game-board.component';
import { ProgressBarComponent } from '../components/progress-bar/progress-bar';
import { TimerBarComponent } from '../components/timer-bar/timer-bar';
import { AIService } from '../services/iaService';
import { TokenSelectorComponent } from '../components/token-selector/token-selector';
import {TokenGaleryPage} from '../pages/token-galery/token-galery';

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
    GamePage,
    CharacterSelectionPage,
    ConfigurationPage,
    TokenGaleryPage,
    //componentes
    GridSelectorComponent,
    ScoreboardComponent,
    GameBoardComponent,
    ProgressBarComponent,
    TimerBarComponent, 
    TokenSelectorComponent

    
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
    ConfigurationPage,
    GamePage,
    TokenGaleryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConfigurationService,
    AuthService,
    AIService
  ]
})
export class AppModule {}
