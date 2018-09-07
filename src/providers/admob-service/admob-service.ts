import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdMobPro, AdMobOptions } from '@ionic-native/admob-pro';

/*
  Generated class for the AdmobServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AdmobServiceProvider {

  constructor(public http: HttpClient, private admob: AdMobPro) {
    console.log('Hello AdmobServiceProvider Provider');
  }


  async showBanner(){
    const options : AdMobOptions = {
      //adId: xxxxxxxxx
      isTesting: true,
      autoShow: true,

    }
    this.admob.createBanner(options);
  }
}
