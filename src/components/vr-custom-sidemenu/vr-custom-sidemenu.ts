import { Component, Injectable } from '@angular/core';
import { ConfigurationServiceDB } from '../../services/configurationdb.service';
import { ConfigurationModel } from '../../models/configuration';
import { Events, Toggle } from 'ionic-angular';


@Component({
  selector: 'vr-custom-sidemenu',
  templateUrl: 'vr-custom-sidemenu.html'
})
@Injectable()
export class VrCustomSidemenuComponent {

  //parametros para desplegar el sideNav y reposicionar el sidebar
  navWidth: number;
  sidePos: number;
  isOpen: boolean;
  //Settings 
  settingsBtnActive: boolean;
  settingSubActive: boolean;
  //User
  userBtnActive: boolean;
  userSubActive: boolean;
  //configuraciones 
  languages = ['English', 'Spanish'];
  currentLang: string = 'English';
  music: boolean;
  sfx: boolean;
  notifications: boolean;

  //Menu activo actual para saber que vista rendeizar
  currentActiveMenu: string;
  menus: string[] = ['settings', 'settings-info', 'user-login', 'user-create', 'user-tokens', 'user-rankings'];

  //Color del Sidebar al abrir y cerrar el sideNav
  opaque = "rgba(0,0,0,0.4)"
  transparent = "transparent";
  //Variable para hacer property binding
  sidebarOpacity: string;

  constructor(private cfgServiceDB: ConfigurationServiceDB, 
              private configModel: ConfigurationModel,
              private events: Events) {
    console.log('Hello VrCustomSidemenuComponent Component');
    this.navWidth = 0;
    this.sidePos = 0;
    this.isOpen = false;
    this.sidebarOpacity = this.transparent;
    //Settings and subcat
    this.settingsBtnActive = true;
    this.settingSubActive = false;
    //user and subcatd
    this.userBtnActive = true;
    this.userSubActive = false;
    //inicializar configuraciones
    //inicializando formulario de config
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
    //ATRAPA ESTE EVENTO DONDE QUIERA QUE SE LLAME Y EJECUTA LA FUNCION FAT ARROW!
    events.subscribe(('settings:changed'),() => {
      console.log("Event catched by app");
      this.initSettings();
    } );
  }

  openNav() {
    this.navWidth = 80;
    this.sidePos = 80;
    this.toggleOpen();
  }

  closeNav() {
    this.navWidth = 0;
    this.sidePos = 0;
    this.enableAllCategories();
    this.disableAllSubCategories();
    this.toggleOpen();
  }

  toggleOpen() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.sidebarOpacity = this.opaque;
    } else {
      this.sidebarOpacity = this.transparent;
    }
  }

  openSettingsCategory() {
    this.openNav();
    //disble user
    this.userBtnActive = false;
    this.disableAllSubCategories();
    //enable settings subcat
    this.settingSubActive = true;
  }

  openUserCategory() {
    this.openNav();
    this.settingsBtnActive = false;
    this.disableAllSubCategories();
    this.userSubActive = true;
  }

  enableAllCategories() {
    this.settingsBtnActive = true;
    this.userBtnActive = true;
  }

  disableAllSubCategories(): any {
    this.settingSubActive = false;
    this.userSubActive = false;
  }

  initSettings() {
    console.log("menu opened", this.configModel.sfx, this.configModel.sfx, this.configModel.language, this.configModel.notifications);

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
