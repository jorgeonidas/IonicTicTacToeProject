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
  gameType: string='singleplayer';
  //gameType: string='local-multiplayer';
  rounds: number = 1;
  difficulty: string = 'easy';

  gamePage = GamePage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CharacterSelectionPage');
    this.gameType = this.navParams.get('selection'); //mientras testeo
    
    console.log(this.gameType); 
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
      difficulty: this.difficulty}
    );
  }
}
