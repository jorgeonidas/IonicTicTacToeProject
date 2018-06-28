import { Component, Injectable } from '@angular/core';
import { ConfigurationServiceDB } from '../../services/configurationdb.service';
import { ConfigurationModel } from '../../models/configuration';
import { Events, Toggle, AlertController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/authService';


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
  //login & create user
  loginForm: FormGroup;
  createUserForm: FormGroup;
  currentDate;
  dateOfBirth;
  //configuraciones 
  languages = ['English', 'Spanish'];
  currentLang: string = 'English';
  music: boolean;
  sfx: boolean;
  notifications: boolean;

  //Menu activo actual para saber que vista rendeizar
  currentActiveMenu: string;
  menus: string[] = ['settings', 'settings-info', 'user-login', 'user-create', 'user-tokens', 'user-rankings'];
  activeButtons: boolean[];

  //Color del Sidebar al abrir y cerrar el sideNav
  opaque = "rgba(0,0,0,0.4)"
  transparent = "transparent";
  //Variable para hacer property binding
  sidebarOpacity: string;

  constructor(private cfgServiceDB: ConfigurationServiceDB, 
              private configModel: ConfigurationModel,
              private events: Events,
              private authService: AuthService, 
              private alertCtrl: AlertController) 
    {
    console.log('Hello VrCustomSidemenuComponent Component');
    //[0:'settings', 1:'settings-info', 2:'user-login' y 'user-create', 3:'user-tokens', 4:'user-rankings'];
    this.activeButtons =  [true, false, true, false, false];//solo hay 5 pestañas ya que user y create comparten la misma
    console.log(this.activeButtons);
    
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
    //Menu actualmente activo
    this.currentActiveMenu = 'settings'
    //inicializar configuraciones
    //inicializando formulario de config
    this.getSettingsFromDB();
    
    //ATRAPA ESTE EVENTO DONDE QUIERA QUE SE LLAME Y EJECUTA LA FUNCION FAT ARROW!
    events.subscribe(('settings:changed'),() => {
      console.log("Event catched by app");
      this.initSettings();
    } );

    //Login Form
    this.initializeLoginForm();
    //crate user form 
    this.initializeCreateUserForm();
  }

  //get settings from json
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
    this.initializeLoginForm();
    this.initializeCreateUserForm();
    this.toggleOpen();
    this.setToOriginalState();
  }

  toggleOpen() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.sidebarOpacity = this.opaque;
    } else {
      this.sidebarOpacity = this.transparent;
    }
  }
  //Settings view Deployment
  openSettingsCategory() {
    if (!this.isOpen) {
      this.openNav();
      //disable user
      this.userBtnActive = false;
      this.disableAllSubCategories();
      //enable settings subcat
      this.settingSubActive = true;
    }
    this.setToOriginalState();
    this.setCurrentActiveMenu('settings');
  }

  openImportantInfoView(){
    this.setCurrentActiveMenu('settings-info');
    this.activateButton(1);
  }
  //User view deployment
  openUserCategory() {
    if(!this.isOpen){
      this.openNav();
      this.settingsBtnActive = false;
      this.disableAllSubCategories();
      this.userSubActive = true;
    }
    this.setToOriginalState();
    this.initializeLoginForm();
    this.initializeCreateUserForm();
    this.setCurrentActiveMenu('user-login');
  }

  openCreateUserView(){
    this.setCurrentActiveMenu('user-create');
    this.setToOriginalState();
  }

  openTokensView(){
    this.setCurrentActiveMenu('user-tokens');
    this.activateButton(3);
  }

  openRankingView(){
    this.setCurrentActiveMenu('user-rankings');
    this.activateButton(4);
  }

  //Enable and disable sidemenu buttons states
  enableAllCategories() {
    this.settingsBtnActive = true;
    this.userBtnActive = true;
  }

  disableAllSubCategories(): any {
    this.settingSubActive = false;
    this.userSubActive = false;
  }

  //Current Active menu to show on the sideNav
  setCurrentActiveMenu(currMenu: string){
    this.currentActiveMenu = currMenu;
  }

  //Initialize the settings form
  initSettings() {
    console.log("from vr-custom-sidemenu", this.configModel.sfx, this.configModel.sfx, this.configModel.language, this.configModel.notifications);

    this.sfx = this.configModel.sfx;
    this.music = this.configModel.music;
    this.currentLang = this.configModel.language;
    this.notifications = this.configModel.notifications;
  }

  //Configuration changes
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

  //Login Form Functions
  initializeLoginForm() {
    this.loginForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
    });
  }

  onSubmitLogin(event: any) {
    console.log(event);

    if (!this.loginForm.invalid) {
      const values = this.loginForm.value;
      console.log(values);
    }
  }

  //Create Form Functions
  public initializeCreateUserForm() {
    this.createUserForm = new FormGroup({
      'name': new FormControl('jorgeonidas', Validators.required),
      'password': new FormControl('123456', Validators.required),
      'email': new FormControl('maitest@mail.com', Validators.required),
      'day': new FormControl(null, Validators.required),
      'month': new FormControl(null, Validators.required),
      'year': new FormControl(null, Validators.required),
      'useragre': new FormControl(true, Validators.required),
    });
  }

  onSubmitCreateUser(event: any) {
    console.log(event);

    if (!this.createUserForm.invalid) {
      const value = this.createUserForm.value;
      console.log(value);
      console.log(this.createUserForm.value);
      this.currentDate = new Date();
      console.log(this.currentDate.toISOString().split('.')[0] + " ");
      this.dateOfBirth = new Date(value.year, value.month, value.day);

      this.authService.signup(value.email,
        value.name, value.password,
        this.dateOfBirth.toISOString().split('.')[0] + " ",
        this.currentDate.toISOString().split('.')[0] + " ",
        "N")
        .subscribe((resutl) => {
          console.log(resutl);
          this.initializeCreateUserForm();
          this.openUserCategory();
        },
          error => {
            let alert = this.alertCtrl.create({
              title: 'Error!',
              message: error.name,
              buttons:
                [
                  {
                    text: 'Ok',
                    role: 'cancel',
                  }
                ]
            });
            alert.present();
          /*console.log(error);
          console.log(error.name);
          console.log(error.message);
          console.log(error.status);*/}
        );
      //this.navCtrl.push(LoginPage);
    }

  }

  deactivateAllButtons(){
    for (let index = 0 ; index < this.activeButtons.length; index++) {
      this.activeButtons[index] = false;
    }
  }

  setToOriginalState(){
    this.activeButtons =  [true, false, true, false, false];
  }

  activateButton(index: number){
    this.deactivateAllButtons();
    this.activeButtons[index] = true;
    console.log(this.activeButtons);
    
  }
}
