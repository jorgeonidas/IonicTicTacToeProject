import { NgModule } from '@angular/core';
import { ProgressBarComponent } from './progress-bar/progress-bar';
import { TimerBarComponent } from './timer-bar/timer-bar';
import { TokenSelectorComponent } from './token-selector/token-selector';
import { VrCustomSidemenuComponent } from './vr-custom-sidemenu/vr-custom-sidemenu';
@NgModule({
	declarations: [ProgressBarComponent,
    TimerBarComponent,
    TokenSelectorComponent,
    VrCustomSidemenuComponent],
	imports: [],
	exports: [ProgressBarComponent,
    TimerBarComponent,
    TokenSelectorComponent,
    VrCustomSidemenuComponent]
})
export class ComponentsModule {}
