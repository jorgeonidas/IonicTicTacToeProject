import { NgModule } from '@angular/core';
import { ProgressBarComponent } from './progress-bar/progress-bar';
import { TimerBarComponent } from './timer-bar/timer-bar';
@NgModule({
	declarations: [ProgressBarComponent,
    TimerBarComponent],
	imports: [],
	exports: [ProgressBarComponent,
    TimerBarComponent]
})
export class ComponentsModule {}
