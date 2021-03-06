import { Component, Injectable, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../services/authService';
import { AlertController, LoadingController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ErrorHandlerProvider } from '../../providers/error-handler/error-handler';

@Injectable()
@Component({
  selector: 'create-account',
  templateUrl: 'create-account.html'
})
export class CreateAccountComponent {

  createUserForm: FormGroup;
  currentDate;
  dateOfBirth;
  errMsj: string;

  @Output() toLogin: EventEmitter<any> = new EventEmitter<any>()

  constructor(private authService: AuthService, 
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private errorHandlerServ : ErrorHandlerProvider) {
    this.initializeCreateUserForm();
  }

  //Create Form Functions
  public initializeCreateUserForm() {
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
      'dob': new FormControl(null, Validators.required),
      'useragre': new FormControl(true, CreateAccountComponent.UserAgreValidator),
    });
  }

  onSubmitCreateUser(event: any) {
    //console.log(event);
    console.log("create user values",this.createUserForm.value);
    
    const loading = this.loadingCtrl.create({content: 'Please Waint...'});

    if (!this.createUserForm.invalid) {
      loading.present();
      const value = this.createUserForm.value;
      console.log(value);
      console.log(this.createUserForm.value.dob);
      this.currentDate = new Date();
      console.log(this.currentDate.toISOString().split('.')[0] + " ");
      //this.dateOfBirth = new Date(value.year, value.month, value.day);
      this.dateOfBirth = new Date(value.dob);
      console.log("date of birtdh:",this.dateOfBirth);
      
      this.authService.signup(value.email,
        value.name, value.password,
        this.dateOfBirth.toISOString().split('.')[0] + " ",
        this.currentDate.toISOString().split('.')[0] + " ",
        "N")
        .subscribe((resutl) => {
          console.log(resutl);
          this.initializeCreateUserForm();
          //aca emito para volver a la raiz
          let alert = this.alertCtrl.create({
            title: 'Succes!',
            message: 'Account Created Sucessfully',
            buttons: [{text:'Ok',
            role: 'dissmiss'}]
          });
          alert.onDidDismiss(()=>this.backToLoginPage());
          loading.dismiss();
          alert.present();
        },
          error => {
            console.log(error);

            this.errMsj = error.error.message;
            console.log(this.errMsj);
            this.errorHandlerServ.processCreateAccError(this.errMsj);

            loading.dismiss();

            console.log(error.name);
            console.log(error.message);
            console.log(error.status);}
        );
    }
    
  }


  backToLoginPage(){
    this.toLogin.emit();
  }

  static UserAgreValidator(c: AbstractControl): { [key: string]: boolean } {
    let rv: { [key: string]: boolean } = {};
    if (!c.value) {
      rv['notChecked'] = true;
    }
    return rv;
  }

}
