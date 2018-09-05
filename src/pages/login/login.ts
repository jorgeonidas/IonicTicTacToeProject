import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController, LoadingController } from 'ionic-angular';
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

  constructor(public navCtrl: 
    NavController, 
    public navParams: NavParams, 
    private platform: Platform, 
    public auth: AuthService, 
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {
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

  onSubmitLogin(event) {
    let nickname;
    let password;
    if (!this.loginForm.invalid && !this.skipping) {
      const values = this.loginForm.value;
      //console.log(values);

      nickname = values.username;
      password = values.password;

      console.log(nickname, password);

      console.log("antes del login: ", this.auth.getCurrentToken());
      //loading spinner
      const loading = this.loadingCtrl.create({ content: 'Please Waint...' });
      loading.present();

      this.auth.signin(nickname, password).subscribe((result) => {
        console.log(result);
       /*
        console.log(result['id']);
        console.log(result['email']);
        console.log(result["token"]);
*/
        //guardo la data del usuario
        this.auth.setUserLoginData(result['id'], result["username"], result['email'], result["token"]);
        //console.log(this.auth.getCurrentToken());

        let alert = this.alertCtrl.create({
          title: 'Succes!',
          message: 'Loggin Sucessfull',
          buttons: [{
            text: 'Ok',
            role: 'dissmiss'
          }]
        });
        alert.onDidDismiss(() => this.toMainMenuPage());
        loading.dismiss();
        alert.present();

      }, error => {
        console.log(error);
        loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Error!',
          message: error.message,
          buttons: [{
            text: 'Ok',
            role: 'dissmiss'
          }]
        });
        alert.present();
      }
      );

    }
  }
}
