import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/authService';
import { LoadingController, AlertController, Events, Keyboard } from 'ionic-angular';
import { ErrorHandlerProvider } from '../../providers/error-handler/error-handler';
@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginComponent {

  loginForm: FormGroup;
  @Output() toCreateUserComp: EventEmitter<string> = new EventEmitter<string>();
  @Output() toUserAccount: EventEmitter<string> = new EventEmitter<string>();

  constructor(private auth: AuthService, 
    private loadingCtrl: LoadingController, 
    private alertCtrl: AlertController,
    private events : Events,
    private keyboard: Keyboard,
    private errorHandlerServ: ErrorHandlerProvider) {
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

      const loading = this.loadingCtrl.create({ content: 'Please Wait...' }); 
      loading.present();

      this.auth.signin(nickname, password).subscribe((result) => {
        console.log(result);
        

        //guardo la data del usuario
        this.auth.setUserLoginData(result['id'], result["nickName"], result['email'], result["token"]);
        this.auth.getUserByID(result['id'],result["token"]).subscribe((userData)=>{
            console.log("get user by id: login page", userData);
            this.auth.setUserObject(userData);
            this.auth.updateUserData(userData["player"],this.auth.getCurrentToken()).subscribe(
              (data)=>{
                  console.log("EXITO AL ACTUALIZAR");
              },
              (error)=>{console.log(error);
            });
        });
        this.openUserAccount();
        
        this.auth.saveLogin();//Guardando en la db
        loading.dismiss();
        //alert.present();

      }, error => {
        console.log(error);
        this.errorHandlerServ.processLoginError(error.error.message);
        loading.dismiss();

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

  //cerrar teclado
  handleEnter(event: Event){
    this.keyboard.close();
    if(this.loginForm.valid){
      this.onSubmitLogin(event)
    }
  }

}
