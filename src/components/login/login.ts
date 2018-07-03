import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginComponent {

  loginForm: FormGroup;
  @Output() toCreateUserComp: EventEmitter<string> = new EventEmitter<string>();
  @Output() toUserAccount: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
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
    console.log(event);

    if (!this.loginForm.invalid) {
      const values = this.loginForm.value;
      console.log(values);
    }
  }

  openCreateUserView(){
    this.toCreateUserComp.emit('user-create');
  }

  openUserAccount(){
    this.toUserAccount.emit('user-account');
  }

}
