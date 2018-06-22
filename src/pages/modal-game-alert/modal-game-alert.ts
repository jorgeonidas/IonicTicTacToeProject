import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-modal-game-alert',
  templateUrl: 'modal-game-alert.html',
})
export class ModalGameAlertPage {
  
  message: string;
  totalRounds: number;
  currentRound: number;

  constructor(public navCtrl: NavController, 
    private navParams: NavParams, 
    private viewCtrl : ViewController,
    private app : App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalGameAlertPage');
    this.message = this.navParams.get('message');
    console.log(this.message);
    
    this.totalRounds = this.navParams.get('totalRounds');
    this.currentRound = this.navParams.get('currentRound');
  }

  nextRound(nextRound: boolean){
    this.viewCtrl.dismiss(nextRound);
  }

  leaveGame(nextRound: boolean){
    this.viewCtrl.dismiss(nextRound);
    this.app.getRootNav().pop();
    //this.app.getRootNav().popTo(this.app.getRootNav().getByIndex(this.app.getRootNav().length()-3),{animate:false}); //hago pop dos niveles
  }

}
