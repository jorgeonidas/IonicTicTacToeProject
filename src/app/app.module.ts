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
import { ConfigurationServiceDB } from '../services/configurationdb.service';
import { HttpClientModule } from '@angular/common/http';

import { IonicStorageModule } from '@ionic/storage';
import { CharacterSelectionPage } from '../pages/character-selection/character-selection';
import { AuthService } from '../services/authService';
import { PreGamePage } from '../pages/pre-game/pre-game';
import { GamePage } from '../pages/game/game';

import { ScoreboardComponent } from '../components/scoreboard/scoreboard.component';
import { GridSelectorComponent } from '../components/grid-selector/grid-selector.component';
import { GameBoardComponent } from '../components/game-board/game-board.component';
import { ProgressBarComponent } from '../components/progress-bar/progress-bar';
import { TimerBarComponent } from '../components/timer-bar/timer-bar';
import { AIService } from '../services/iaService';
import { TokenSelectorComponent } from '../components/token-selector/token-selector';
import {TokenGaleryPage} from '../pages/token-galery/token-galery';

import { DragulaModule } from 'ng2-dragula';//dragula
import { ConfigurationModel } from '../models/configuration';
import { PlayerSelectorService } from '../services/playerSelService';
import { VrCustomSidemenuComponent } from '../components/vr-custom-sidemenu/vr-custom-sidemenu';
import { RankingStatisticsComponent } from '../components/ranking-statistics/ranking-statistics';
import { TokenSelectorBarComponent } from '../components/token-selector-bar/token-selector-bar';
import { LoginComponent } from '../components/login/login';
import { ImportantInformationComponent } from '../components/important-information/important-information';
import { SettingsComponent } from '../components/settings/settings';
import { CreateAccountComponent } from '../components/create-account/create-account';
import { InformationBarComponent } from '../components/information-bar/information-bar';
import { TokenService } from '../services/tokenService';
import { UserAccountComponent } from '../components/user-account/user-account';
import { CoinEolaContainerComponent } from '../components/coin-eola-container/coin-eola-container';
import { ContactsPage } from '../pages/contacts/contacts';
import { TokenStorePage } from '../pages/token-store/token-store';


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
    PreGamePage,
    ContactsPage,
    TokenStorePage,
    //componentes
    GridSelectorComponent,
    ScoreboardComponent,
    GameBoardComponent,
    ProgressBarComponent,
    TimerBarComponent, 
    TokenSelectorComponent,
    VrCustomSidemenuComponent,
    RankingStatisticsComponent,
    TokenSelectorBarComponent,
    ImportantInformationComponent,
    SettingsComponent,
    LoginComponent,
    CreateAccountComponent,
    UserAccountComponent,
    InformationBarComponent,
    CoinEolaContainerComponent

    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      platforms:{
        ios:{
          swipeBackEnabled: false
        }
      }
    }),
    HttpClientModule,
    IonicStorageModule.forRoot(),
    DragulaModule
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
    TokenGaleryPage,
    PreGamePage,
    ContactsPage,
    TokenStorePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConfigurationServiceDB,
    ConfigurationModel,
    AuthService,
    AIService,
    PlayerSelectorService,
    TokenService
  ]
})
export class AppModule {}
