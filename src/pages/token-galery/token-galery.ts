import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-token-galery',
  templateUrl: 'token-galery.html',
})
export class TokenGaleryPage {
  tokenGallery: any [];
  constructor(private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TokenGaleryPage');
    this.tokenGallery = [1,2,3,4,5,6,7,8,9]
  }

  onClose(){
    this.viewCtrl.dismiss();
  }

}
