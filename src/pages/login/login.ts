import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { MainMenuPage } from '../main-menu/main-menu';
import { CreateAccountPage } from '../create-account/create-account';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/authService';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  mainMenuPage = MainMenuPage;
  createAccPage = CreateAccountPage;
  loginForm: FormGroup;
  skipping: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform, public auth: AuthService) {
    this.initializeLoginForm();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.skipping = false;
  }

  //Login Form Functions
  initializeLoginForm() {
    this.loginForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
    });
  }

  toMainMenuPage(){  
    //this.navCtrl.push(this.mainMenuPage, {}, {animate: false});
    this.skipping = true;
    this.navCtrl.setRoot(MainMenuPage, {}, {animate: false});
  }

  toCreateAccountPage(){
    this.navCtrl.push(this.createAccPage, {}, {animate: false});
  }

  onSubmitLogin(event){
    let nickname;
    let password;
    if (!this.loginForm.invalid && !this.skipping) {
      const values = this.loginForm.value;
      //console.log(values);

      nickname = values.username;
      password = values.password;
      
      console.log(nickname, password);

      this.auth.signin(nickname,password).subscribe((result)=>{
        console.log(result); 
      },error=>{
        console.log(error);      
      }
      );
      
    }
  }
}
