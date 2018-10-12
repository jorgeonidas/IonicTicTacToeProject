import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Events } from 'ionic-angular';
import { AdmobServiceProvider } from '../../providers/admob-service/admob-service';
import * as Constants from '../../services/Constants'
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
              msj: Constants.GAME_INVITE_PENDING},
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
              msjReaded: false,
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
              msj: Constants.GAME_INVITE_SENT},
    action: 3
  }

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private admob: AdmobServiceProvider,
     private platform: Platform,
     private events : Events) {
    //console.log(this.contactTest2);
    //this.contactTest2.msjNot.msj=this.GameIvnPending;
      /*
    this.events.subscribe('interstitialFail: true',()=>{
      this.navCtrl.pop({animate : false});
    });
    */


    this.platform.ready().then(()=>{
      //prepara y muestra add
      this.admob.prepareInterstitialAd();
  
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactsPage');
    //this.admob.hidddeBanner();
    
  }

  backToMainMenu(){
    if(this.admob.cordovaAviable){
      if(!this.admob.failToLoadInterstitial){
        this.admob.showInterstitialAd().onAdDismiss().subscribe(()=>{
          this.navCtrl.pop({animate:false});
        }, e =>{
          console.log(e);
          this.navCtrl.pop({animate:false});
          
        });
      }else{
        this.navCtrl.pop({animate:false});
      }
    }else{
      this.navCtrl.pop({animate:false});
    }
    //
  }

}
