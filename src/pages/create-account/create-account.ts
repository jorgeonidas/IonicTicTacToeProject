import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { MainMenuPage } from '../main-menu/main-menu';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
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
  isSubmintAction: boolean;

  ngOnInit(){
    this.initializeForm();
  }

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private authService: AuthService, 
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController) {
    authService.testingApi();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateAccountPage');
    this.isSubmintAction = true;
  }

  public initializeForm(){
    this.createUserForm = new FormGroup({
      'name': new FormControl('jorgeonidas', Validators.compose([Validators.minLength(4),Validators.maxLength(30),Validators.required])),
      'password': new FormControl('123456', Validators.compose([Validators.minLength(4),Validators.maxLength(8),Validators.required])),
      'email': new FormControl('maitest@mail.com', 
      Validators.compose([
        Validators.minLength(4),
        Validators.maxLength(60), 
        Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$'),
        Validators.required
      ])),
      /*
      'day': new FormControl(null, Validators.required),
      'month': new FormControl(null, Validators.required),
      'year': new FormControl(null, Validators.required),
      */
      'dob': new FormControl(null, Validators.required),
      'useragre': new FormControl(false, CreateAccountPage.UserAgreValidator),
    });
  }

  onSubmit(event: any){
    console.log(event);
    //si el formulario no es valido o no presiono el boton crear account 
    //por alguna razon si creo un boton dentro de un form hace el submit de todos modos
    if(!this.createUserForm.valid || !this.isSubmintAction){
      return;
    }

    const loading = this.loadingCtrl.create({content: 'Please Waint...'});
    loading.present();
    const value = this.createUserForm.value;
    console.log(this.createUserForm.value);
    this.currentDate = new Date();
    console.log(this.currentDate.toISOString().split('.')[0]+" " );
    //this.dateOfBirth = new Date(value.year,value.month, value.day);
    this.dateOfBirth = new Date(value.dob);
    console.log(this.dateOfBirth.toISOString().split('.')[0]+" " );

    this.authService.signup(value.email, 
      value.name, value.password, 
      this.dateOfBirth.toISOString().split('.')[0]+" " ,
      this.currentDate.toISOString().split('.')[0]+" " ,
      "N")
      .subscribe((resutl)=>{
        loading.dismiss();
        console.log(resutl);
        this.navCtrl.push(LoginPage);
      },
      error=>{
        loading.dismiss();
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

  toMainMenuPage(){
    this.isSubmintAction = false;
    this.navCtrl.setRoot(this.mainMenuPage,{},{animate: false});
    //this.navCtrl.push(this.mainMenuPage, {}, {animate: false})
  }
  
  //Custom Validator para checkbox
  static UserAgreValidator(c: AbstractControl): { [key: string]: boolean } {
    let rv: { [key: string]: boolean } = {};
    if (!c.value) {
      rv['notChecked'] = true;
    }
    return rv;
  }

  backToLogin(){
    this.isSubmintAction = false;
    this.navCtrl.pop({animate:false});
  }
}
