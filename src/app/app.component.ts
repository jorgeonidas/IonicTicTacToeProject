import { Component } from '@angular/core';
import { Platform, MenuController, AlertController, Toggle } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { MainMenuPage } from '../pages/main-menu/main-menu';
import { CreateAccountPage } from '../pages/create-account/create-account';
import { CharacterSelectionPage } from '../pages/character-selection/character-selection';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/authService';
import { ConfigurationService } from '../services/configuration.service';
import { GamePage } from '../pages/game/game';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  mainMenuPage = MainMenuPage;
  //pagina root
  rootPage:any = CharacterSelectionPage;
  activeMenu: string;
  //forms en los togglemenus
  loginForm: FormGroup;
  createUserForm: FormGroup;
  currentDate;
  dateOfBirth;
  //configuraciones 
    languages = ['English','Spanish'];
    currentLang: string = 'English';
    music: boolean;
    sfx: boolean;
    notifications: boolean;


  constructor(platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen, 
    private menuCtrl: MenuController,
    private authService: AuthService, 
    private alertCtrl: AlertController,
    private configService: ConfigurationService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.initializeLoginForm();
    this.initializeCreateUserForm();
    //this.authService.testingApi();

    //inicializando formulario de config
        this.configService.get('sfx').then((val)=>{
          console.log(val);
          this.sfx = val; 
        });

      this.configService.get('music').then((val)=>{
          console.log(val);
          this.music = val; 
      });

      this.configService.get('currentLang').then((val)=>{
          console.log(val);
          this.currentLang = val; 
      });

      this.configService.get('notifications').then((val)=>{
          console.log(val);
          this.notifications = val; 
      });
  }

  menuCreateAccActive(){
    this.activeMenu = 'createAccount'
    this.menuCtrl.enable(true, 'createAccount');
    this.menuCtrl.enable(false, 'login');
    this.menuCtrl.open(this.activeMenu);
  }

  menuLoginActive(){
    this.activeMenu = 'login'
    this.menuCtrl.enable(true, 'login');
    this.menuCtrl.enable(false, 'createAccount');
    this.menuCtrl.open(this.activeMenu);
    this.initializeCreateUserForm();//reseteo el formulario si clickeo Back desde crear usuario
  }

  //Submit login
  onSubmitLogin(event: any){
    console.log(event);
    
    if(!this.loginForm.invalid){
      const values = this.loginForm.value;
      console.log(values);
    }   
  }

  onSubmitCreateUser(event : any){
    console.log(event);
    
    if(!this.createUserForm.invalid){
      const value = this.createUserForm.value;
      console.log(value);
      console.log(this.createUserForm.value);
      this.currentDate = new Date();
      console.log(this.currentDate.toISOString().split('.')[0]+" " );
      this.dateOfBirth = new Date(value.year,value.month, value.day);

      this.authService.signup(value.email, 
        value.name, value.password, 
        this.dateOfBirth.toISOString().split('.')[0]+" " ,
        this.currentDate.toISOString().split('.')[0]+" " ,
        "N")
        .subscribe((resutl)=>{
          console.log(resutl);
          this.initializeCreateUserForm();
          this.menuLoginActive();
        },
        error=>{
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

  initializeLoginForm(){
    this.loginForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null,Validators.required)
    });
  }

  public initializeCreateUserForm(){
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

  //configuraciones 
  onSelectChange(selectedValue: any) {
    console.log(selectedValue);    
    this.currentLang = selectedValue;
    this.configService.set('currentLang',selectedValue);
  }

  onToggle(toggle: Toggle, option: string){
    console.log(toggle.value);
    console.log(option);

    this.configService.set(option,toggle.value);
  }
}

