import { NgModule } from '@angular/core';
import { ProgressBarComponent } from './progress-bar/progress-bar';
import { TimerBarComponent } from './timer-bar/timer-bar';
import { TokenSelectorComponent } from './token-selector/token-selector';
import { VrCustomSidemenuComponent } from './vr-custom-sidemenu/vr-custom-sidemenu';
import { RankingStatisticsComponent } from './ranking-statistics/ranking-statistics';
import { TokenSelectorBarComponent } from './token-selector-bar/token-selector-bar';
import { LoginComponent } from './login/login';
import { ImportantInformationComponent } from './important-information/important-information';
import { SettingsComponent } from './settings/settings';
import { CreateAccountComponent } from './create-account/create-account';
import { InformationBarComponent } from './information-bar/information-bar';
@NgModule({
	declarations: [ProgressBarComponent,
    TimerBarComponent,
    TokenSelectorComponent,
    VrCustomSidemenuComponent,
    RankingStatisticsComponent,
    TokenSelectorComponent,
    TokenSelectorBarComponent,
    LoginComponent,
    ImportantInformationComponent,
    SettingsComponent,
    CreateAccountComponent,
    InformationBarComponent],
	imports: [],
	exports: [ProgressBarComponent,
    TimerBarComponent,
    TokenSelectorComponent,
    VrCustomSidemenuComponent,
    RankingStatisticsComponent,
    TokenSelectorComponent,
    TokenSelectorBarComponent,
    LoginComponent,
    ImportantInformationComponent,
    SettingsComponent,
    CreateAccountComponent,
    InformationBarComponent]
})
export class ComponentsModule {}
