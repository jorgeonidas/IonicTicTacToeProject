import { NgModule } from '@angular/core';
import { ProgressBarComponent } from './progress-bar/progress-bar';
import { TimerBarComponent } from './timer-bar/timer-bar';
import { TokenSelectorComponent } from './token-selector/token-selector';
import { VrCustomSidemenuComponent } from './vr-custom-sidemenu/vr-custom-sidemenu';
import { RankingStatisticsComponent } from './ranking-statistics/ranking-statistics';
@NgModule({
	declarations: [ProgressBarComponent,
    TimerBarComponent,
    TokenSelectorComponent,
    VrCustomSidemenuComponent,
    RankingStatisticsComponent,
    TokenSelectorComponent],
	imports: [],
	exports: [ProgressBarComponent,
    TimerBarComponent,
    TokenSelectorComponent,
    VrCustomSidemenuComponent,
    RankingStatisticsComponent,
    TokenSelectorComponent]
})
export class ComponentsModule {}
