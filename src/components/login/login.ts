import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/authService';
import { LoadingController, AlertController } from 'ionic-angular';
@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginComponent {

  loginForm: FormGroup;
  @Output() toCreateUserComp: EventEmitter<string> = new EventEmitter<string>();
  @Output() toUserAccount: EventEmitter<string> = new EventEmitter<string>();

  constructor(private auth: AuthService, private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
    console.log('Hello LoginComponent Component');
    this.initializeLoginForm();
  }

  //Login Form Functions
  initializeLoginForm() {
    this.loginForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
    });
  }

  onSubmitLogin(event: any) {
    console.log("FIRE");
    
    console.log(event);
    let nickname;
    let password;
    if (!this.loginForm.invalid) {
      const values = this.loginForm.value;
      console.log(values);

      nickname = values.username;
      password = values.password;

      const loading = this.loadingCtrl.create({ content: 'Please Waint...' }); 
      loading.present();

      this.auth.signin(nickname, password).subscribe((result) => {
        console.log(result);
     
        //guardo la data del usuario
        this.auth.setUserLoginData(result['id'], result["username"], result['email'], result["token"]);
        this.auth.getUserByID(result['id'],result["token"]);
        this.auth.saveLogin();//Guardando en la db
        let alert = this.alertCtrl.create({
          title: 'Succes!',
          message: 'Loggin Sucessfull',
          buttons: [{
            text: 'Ok',
            role: 'dissmiss'
          }]
        });
        alert.onDidDismiss(() => this.openUserAccount());
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

  openCreateUserView(){
    this.toCreateUserComp.emit('user-create');
  }

  openUserAccount(){
    this.toUserAccount.emit('user-account');
  }

}
