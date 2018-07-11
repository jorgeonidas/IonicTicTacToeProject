import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html',
})
export class ContactsPage {

  
  GameIvnPending: string= 'Game Invitation Pending';
  /*TODO HACER MAS CONTACTOS PARA REFLEJAR OTROS ESTADOS */
  contactTest2 = {
    status: 2,
    ranking: 'assets/imgs/medal-icon.png',
    nick: 'AveryLongNickname',
    msjNot: {type:'notification',
              msjReaded: true,
              msj: "Game Invitation Pending"},
    action: 2
  }

  contactTest3 = {
    status: 3,
    ranking: 'assets/imgs/medal-icon.png',
    nick: 'Bobe',
    msjNot: {type:'message',
              msjReaded: true,
              msj: "a very very long message from this chat keeps writing"},
    action: 4
  }

  contactTest4 = {
    status: 4,
    ranking: 'assets/imgs/medal-icon.png',
    nick: 'Lika',
    msjNot: {type:'message',
              msjReaded: true,
              msj: "espera que ando jugando"},
    action: 1
  }

  contactTest5 = {
    status: 5,
    ranking: 'assets/imgs/medal-icon.png',
    nick: 'Ububi',
    msjNot: {type:'notification',
              msjReaded: true,
              msj: ""},
    action: 5
  }

  contactTest6 = {
    status: 5,
    ranking: 'assets/imgs/medal-icon.png',
    nick: 'Grisa',
    msjNot: {type:'notification',
              msjReaded: true,
              msj: ""},
    action: 6
  }

  contactTest7 = {
    status: 2,
    ranking: 'assets/imgs/medal-icon.png',
    nick: 'Kalo',
    msjNot: {type:'notification',
              msjReaded: true,
              msj: "Game Invitation Sent"},
    action: 3
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //console.log(this.contactTest2);
    //this.contactTest2.msjNot.msj=this.GameIvnPending;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactsPage');
  }

  backToMainMenu(){
    this.navCtrl.pop({animate:false});
  }

}
