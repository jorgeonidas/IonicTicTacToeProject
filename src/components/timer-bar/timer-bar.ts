import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PopoverController } from 'ionic-angular';
import { ConfigurationPage } from '../../pages/settings-menu/configuration/configuration';

@Component({
  selector: 'timer-bar',
  templateUrl: 'timer-bar.html'
})
export class TimerBarComponent {

  @Input() currentRound: number;
  @Input() timer: number;
  @Input() value = 100;

  gamePaused : boolean;
  @Output() pausedEmmiter = new EventEmitter<boolean>();

  constructor(private popoverCtrl: PopoverController) {
    console.log('Hello TimerBarComponent Component');
    this.currentRound = 1;
    this.gamePaused = false;
  }


  onOptionsMenu(){
    this.gamePaused = true;
    this.pausedEmmiter.emit(this.gamePaused);
    const popover = this.popoverCtrl.create(ConfigurationPage);

    popover.onDidDismiss(()=>{
      this.gamePaused = false;
      this.pausedEmmiter.emit(this.gamePaused);
    });

    popover.present({animate: false});

  }

}
