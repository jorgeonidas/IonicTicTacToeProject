import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PopoverController } from 'ionic-angular';
import { ConfigurationPage } from '../../pages/settings-menu/configuration/configuration';
import { SettingsComponent } from '../settings/settings';

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
  @Output() continueGameEmmiter = new EventEmitter<boolean>();

  constructor(private popoverCtrl: PopoverController) {
    console.log('Hello TimerBarComponent Component');
    this.currentRound = 1;
    this.gamePaused = false;
  }


  onOptionsMenu(){
    this.gamePaused = true;
    this.pausedEmmiter.emit(this.gamePaused);
    const popover = this.popoverCtrl.create(SettingsComponent,{fromTimebar:true},{enableBackdropDismiss: false});

    popover.onDidDismiss((data)=>{
      if(data){
        this.gamePaused = false;
        this.pausedEmmiter.emit(this.gamePaused);
      }else{
        this.continueGameEmmiter.emit(false);
      }
      
    });

    popover.present({animate: false});

  }

}
