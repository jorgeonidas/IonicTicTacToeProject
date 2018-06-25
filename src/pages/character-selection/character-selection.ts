import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MainMenuPage } from '../main-menu/main-menu';
import { GamePage } from '../game/game';
import { PreGamePage } from '../pre-game/pre-game';

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
  preGamePage = PreGamePage;
  
  //retratos
  playerOnePortrait: string;
  playerTwoOrBotPortrait: string;
  isOverOne: boolean;
  isOverTwo: boolean;
  portraitsUrls : string[];
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

    //llenamos el array de assets
    this.portraitsUrls = 
    [
      'assets/imgs/enojado.png',
      'assets/imgs/cansado.png',
      'assets/imgs/enamorado.png',
      'assets/imgs/escondido.png',
      'assets/imgs/like.png',
      'assets/imgs/upps.png',
      'assets/imgs/sorprendido.png',
      'assets/imgs/lol.png',
    ];
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
    this.navCtrl.push(this.preGamePage,
      {gameType: this.gameType, 
      rounds: this.rounds, 
      difficulty: this.difficulty,
      playerOnePortrait: this.playerOnePortrait,
      playerTwoOrBotPortrait: this.playerTwoOrBotPortrait}, 
      {animate: false}
    );
  }

  onClickBack(){
    this.navCtrl.pop({animate:false});
  }

  //eventos 
  updatePlayerOnePortrati(asset : string){
    console.log(asset);
    this.portraitOne[0] = asset;
    this.playerOnePortrait = asset;
    console.log("portrait one " + this.portraitOne[0]);
    
    
  }

  updatePlayerTwoOrBotProtrait(asset : string){
    console.log(asset);
    this.portraitTwo[0]= asset;
    this.playerTwoOrBotPortrait = asset;
    console.log("portrait two " + this.portraitTwo[0]);
    
  }

  setOverOnePortrait(value : boolean){
    this.isOverOne = value;
    console.log(this.isOverOne);
    
  }

  setOverTwoPortrait(value: boolean){
    this.isOverTwo = value;
    console.log(this.isOverTwo);
  }

  randPortraitSelectOne(){
    this.updatePlayerOnePortrati(this.portraitsUrls[Math.floor(Math.random()*this.portraitsUrls.length)]);
  }

  randPortraitSelectTwo(){
    this.updatePlayerTwoOrBotProtrait(this.portraitsUrls[Math.floor(Math.random()*this.portraitsUrls.length)]);
  }
}
