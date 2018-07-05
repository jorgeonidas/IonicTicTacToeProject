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
    //this.getSettingsFromDB();

    //this.getSettingsFromDB();
    this.initSettings();
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
