import { Component, Injectable } from '@angular/core';
import { ConfigurationServiceDB } from '../../services/configurationdb.service';
import { ConfigurationModel } from '../../models/configuration';
import { Events, Toggle, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'settings',
  templateUrl: 'settings.html'
})
@Injectable()
export class SettingsComponent {

   //configuraciones 
   languages = ['English', 'Spanish'];
   currentLang: string = 'English';
   music: boolean;
   sfx: boolean;
   notifications: boolean;
  lauchedFromGame: boolean;
  constructor(private viewCtrl: ViewController, private cfgServiceDB: ConfigurationServiceDB, 
    private configModel: ConfigurationModel,
    private events: Events,
    public navParams:NavParams) {
    console.log('Hello SettingsComponent Component');  
    
    this.initSettings();
    this.events.subscribe(('settings:changed'),() => {
      console.log("Event catched by settings component");
      this.initSettings();
    } );

    this.lauchedFromGame = this.navParams.get('fromTimebar');
    console.log("lauched from game", this.lauchedFromGame);
    
  }
 
  initSettings() {
    console.log("from vr-custom-sidemenu", this.configModel.sfx, this.configModel.sfx, this.configModel.language, this.configModel.notifications);

    this.sfx = this.configModel.sfx;
    this.music = this.configModel.music;
    this.currentLang = this.configModel.language;
    this.notifications = this.configModel.notifications;
  }

  onSelectChange(selectedValue: any) {
    console.log(selectedValue);
    this.currentLang = selectedValue;
    this.cfgServiceDB.set('language', selectedValue);
    this.configModel.language = this.currentLang;
  }

  
  onToggle(toggle: Toggle, option: string) {
    console.log(toggle.value);
    console.log(option);

    this.cfgServiceDB.set(option, toggle.value);
    //actualizo el modelo tambien
    switch (option) {
      case 'music':
        this.configModel.music = toggle.value;
        break;
      case 'sfx':
        this.configModel.sfx = toggle.value;
        break;
      case 'notifications':
        this.configModel.notifications = toggle.value;
        break;
    }
  }

  closeMenu(){
    this.viewCtrl.dismiss(true/*el juego continua*/);
    this.events.publish('settings:changed');//app atrapara este evento
  }

  leaveGame() {
    console.log("leave game event");
    this.events.publish('settings:changed');//app atrapara este evento
    this.cfgServiceDB.setLeavingCurrentGame(true); //el servicio guardara si abandono el juego
    this.viewCtrl.dismiss(false/*el juego NO continua*/);
    //this.appCtrl.getRootNav().popTo(this.appCtrl.getRootNav().getByIndex(this.appCtrl.getRootNav().length()-4),{animate:false}); //hago pop 3 niveles
    //this.appCtrl.getRootNav().pop({animate:false});
  }

}
