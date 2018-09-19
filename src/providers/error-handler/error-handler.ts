import { Injectable } from '@angular/core';

@Injectable()
export class ErrorHandlerProvider {
  
  public logInErrorObj = {
    errorUser : false,
    errorPassword : false,  
  }

  public createAccErrorsObject = {
    userExist: false,
    emailExist: false
  }

  //types of login errors
  userNotExist : string = 'el jugador no existe';
  wromgPassword : string = 'la clave es incorrecta';
  //types of Create Account errors 
  emailExist : string = 'email';
  userExists : string = 'usuario';
  constructor() {
    //console.log('Hello ErrorHandlerProvider Provider');
    this.resetLoginErrors();
    this.resetCreateAccErrors();
  }

  processLoginError(error: string){
    let logError = error;
    console.log(logError);
    this.resetLoginErrors();
    switch (logError) {
      case this.userNotExist:
          this.logInErrorObj.errorUser = true;
        break;

      case this.wromgPassword:
          this.logInErrorObj.errorPassword = true;
        break;
    
      default:
        break;
    }
    console.log(this.logInErrorObj);
    
    //return this.logInErrorObj;
  }

  processCreateAccError(error : string){
    let array = error.split(" ");
    console.log(array);
    let typeErr : string = array[1];
    switch (typeErr) {
      case this.emailExist:
        this.createAccErrorsObject.emailExist = true;
        break;
      
      case this.userExists:
        this.createAccErrorsObject.userExist = true;
        break;
    
      default:
        break;
    }
  }

  resetLoginErrors(){
    for (const prop in this.logInErrorObj) {
      this.logInErrorObj[prop] = false;
      console.log(this.logInErrorObj[prop]);   
    }
  }

  resetCreateAccErrors(): any {
    for (const prop in this.createAccErrorsObject) {
      this.createAccErrorsObject[prop] = false;
      console.log(this.createAccErrorsObject[prop]);   
    }
  }

}
