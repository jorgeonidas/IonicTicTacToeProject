import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MainMenuPage } from '../main-menu/main-menu';
import { GamePage } from '../game/game';

@IonicPage()
@Component({
  selector: 'page-character-selection',
  templateUrl: 'character-selection.html',
})
export class CharacterSelectionPage {
  //gameType: string='singleplayer';
  gameType: string='local-multiplayer';
  rounds: number = 1;
  difficulty: string = 'easy';

  gamePage = GamePage;
  
  //retratos
  playerOnePortrait: string;
  playerTwoOrBotPortrait: string;
  isOverOne: boolean;
  isOverTwo: boolean;
  //dragulaModel
  portraitOne = new Array(1);
  portraitTwo = new Array(1);

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CharacterSelectionPage');
    //this.gameType = this.navParams.get('selection'); //mientras testeo
    
    console.log(this.gameType); 
    this.isOverOne = false;
    this.isOverTwo = false;
  }

  onRoundSelection(nr: number){
    this.rounds = nr;
    console.log(this.rounds);
    
  }

  onDifficultySelection(difficulty: string){
    this.difficulty = difficulty;
    console.log(this.difficulty);
   
  }

  onClickPlay(){
    this.navCtrl.push(this.gamePage,
      {gameType: this.gameType, 
      rounds: this.rounds, 
      difficulty: this.difficulty}, {animate: false}
    );
  }

  onClickBack(){
    this.navCtrl.pop({animate:false});
  }

  //eventos 
  updatePlayerOnePortrati(asset : string){
    console.log(asset);
    this.portraitOne[0] = asset;
    console.log(this.portraitOne);
    
    
  }

  updatePlayerTwoOrBotProtrait(asset : string){
    console.log(asset);
    this.portraitTwo[0]= asset;
    console.log(this.portraitTwo);
    
  }

  setOverOnePortrait(value : boolean){
    this.isOverOne = value;
    console.log(this.isOverOne);
    
  }

  setOverTwoPortrait(value: boolean){
    this.isOverTwo = value;
    console.log(this.isOverTwo);
  }
}
