import { Injectable } from '@angular/core';

@Injectable()
export class ErrorHandlerProvider {
  public logInErrorObj = {
    errorUser : false,
    errorPassword : false,  
  }

  //types of login errors
  userNotExist : string = 'el jugador no existe';
  wromgPassword : string = 'la clave es incorrecta';

  constructor() {
    //console.log('Hello ErrorHandlerProvider Provider');
    this.resetLoginErrors();
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

  resetLoginErrors(){
    for (const prop in this.logInErrorObj) {
      this.logInErrorObj[prop] = false;
      console.log(this.logInErrorObj[prop]);   
    }
  }

}
