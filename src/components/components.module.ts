import { NgModule } from '@angular/core';
import { ProgressBarComponent } from './progress-bar/progress-bar';
import { TimerBarComponent } from './timer-bar/timer-bar';
import { TokenSelectorComponent } from './token-selector/token-selector';
@NgModule({
	declarations: [ProgressBarComponent,
    TimerBarComponent,
    TokenSelectorComponent],
	imports: [],
	exports: [ProgressBarComponent,
    TimerBarComponent,
    TokenSelectorComponent]
})
export class ComponentsModule {}
