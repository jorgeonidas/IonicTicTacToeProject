import { Component, Input } from '@angular/core';
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

  constructor(private popoverCtrl: PopoverController) {
    console.log('Hello TimerBarComponent Component');
    this.currentRound = 1;
  }


  onOptionsMenu(){
    const popover = this.popoverCtrl.create(ConfigurationPage);
    popover.present();
  }

}
