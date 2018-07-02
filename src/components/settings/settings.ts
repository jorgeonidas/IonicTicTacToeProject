import { Component, Injectable } from '@angular/core';
import { ConfigurationServiceDB } from '../../services/configurationdb.service';
import { ConfigurationModel } from '../../models/configuration';
import { Events, Toggle } from 'ionic-angular';

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

  constructor(private cfgServiceDB: ConfigurationServiceDB, 
    private configModel: ConfigurationModel,
    private events: Events,) {
    console.log('Hello SettingsComponent Component');

    this.getSettingsFromDB();
  }

  getSettingsFromDB(){
    this.cfgServiceDB.get('sfx').then((val) => {
      console.log(val);
      this.configModel.setSfx(val);
      this.sfx = this.configModel.sfx;

    });

    this.cfgServiceDB.get('music').then((val) => {
      console.log(val);
      this.configModel.setMusic(val);
      this.music = this.configModel.music;

    });

    this.cfgServiceDB.get('currentLang').then((val) => {
      console.log(val);
      this.configModel.setlanguage(val);
      this.currentLang = this.configModel.language;

    });

    this.cfgServiceDB.get('notifications').then((val) => {
      console.log(val);
      this.configModel.setNotif(val);
      this.notifications = this.configModel.notifications;
    });

    this.events.subscribe(('settings:changed'),() => {
      console.log("Event catched by settings component");
      this.initSettings();
    } );

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
    this.cfgServiceDB.set('currentLang', selectedValue);
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


}
