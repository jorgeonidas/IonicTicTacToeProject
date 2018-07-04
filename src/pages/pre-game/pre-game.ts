import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GamePage } from '../game/game';

@IonicPage()
@Component({
  selector: 'page-pre-game',
  templateUrl: 'pre-game.html',
})
export class PreGamePage {
  gameType: string;
  rounds: number;
  difficulty: string;
  portraitOne :string;
  portraitTwo: string;
  gamePage = GamePage;
  timeout : any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PreGamePage');
    this.gameType = this.navParams.get('gameType');
    this.rounds = this.navParams.get('rounds');
    this.difficulty = this.navParams.get('difficulty');
    this.portraitOne = this.navParams.get('playerOnePortrait');
    this.portraitTwo = this.navParams.get('playerTwoOrBotPortrait');
    console.log(this.portraitOne, this.portraitTwo);

    this.loadGamePage();
    
  }

  loadGamePage(){
    
    this.timeout = setTimeout(() => {
      let currentIndex = this.navCtrl.getActive().index;
      this.navCtrl.push(this.gamePage,
        {gameType: this.gameType, 
        rounds: this.rounds, 
        difficulty: this.difficulty,
        portraitOne: this.portraitOne,
        portraitTwo: this.portraitTwo}, {animate: false}
      ).then(()=>{
        this.navCtrl.remove(currentIndex); //remuevo esta pagina del stack
      });
    }, 3000);
  }

}
