import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { MainMenuPage } from '../main-menu/main-menu';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginPage } from '../login/login';
import { AuthService } from '../../services/authService';

@IonicPage()
@Component({
  selector: 'page-create-account',
  templateUrl: 'create-account.html',
})
export class CreateAccountPage implements OnInit  {
  

  createUserForm : FormGroup;
  mainMenuPage = MainMenuPage;
  currentDate;
  dateOfBirth;

  ngOnInit(){
    this.initializeForm();
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService, private alertCtrl: AlertController) {
    authService.testingApi();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateAccountPage');
  }

  public initializeForm(){
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

  onSubmit(){
    const value = this.createUserForm.value;
    console.log(this.createUserForm.value);
    this.currentDate = new Date();
    console.log(this.currentDate.toISOString().split('.')[0]+" " );
    this.dateOfBirth = new Date(value.year,value.month, value.day);
    console.log(this.dateOfBirth.toISOString().split('.')[0]+" " );

    this.authService.signup(value.email, 
      value.name, value.password, 
      this.dateOfBirth.toISOString().split('.')[0]+" " ,
      this.currentDate.toISOString().split('.')[0]+" " ,
      "N")
      .subscribe((resutl)=>{
        console.log(resutl);
        this.navCtrl.push(LoginPage);
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
