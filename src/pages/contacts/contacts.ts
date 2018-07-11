import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html',
})
export class ContactsPage {

  
  GameIvnPending: string= 'Game Invitation Pending';

  contactTest2 = {
    status: 2,
    ranking: 'assets/imgs/medal-icon.png',
    nick: 'Kim',
    msjNot: {type:'notification',
              msjReaded: true,
              msj: ""},
    action: 2
  }


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.contactTest2);
    this.contactTest2.msjNot.msj=this.GameIvnPending;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactsPage');
  }

  backToMainMenu(){
    this.navCtrl.pop({animate:false});
  }

}
