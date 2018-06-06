import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {
  gameData: any;
  gametype: string = 'local-multiplayer';
  rounds: number = 3;
  currentRound: number = 1;
  difficulty: string = 'easy';

  playerOneScore: number;
  playerTwoOrAIScore: number;

  //round data
  winner: boolean;
  playerOneWinsRound: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
    this.playerOneScore = 0;
    this.playerTwoOrAIScore = 0;
    this.winner= false;
    this.playerOneWinsRound = false;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamePage');
    this.gameData = this.navParams.data;
    console.log(this.gameData);
    this.gametype = this.navParams.get('gameType');
    this.rounds = this.navParams.get('rounds');
    this.difficulty = this.navParams.get('difficulty');
  }

  setRoundWinner(value1: boolean){
    console.log("player one wins?: "+value1); 
    this.playerOneWinsRound = value1;  
  }

  winOrTie(isAWin: boolean){
    console.log("is a win or tie?: "+isAWin);
    this.winner = isAWin;
    
    this.setScore();
  }
  //setea score y revisa si el juego termino
  setScore(){
    //1 revisa si alguien gano o empato la ronda
    if(this.winner){
      //si alguien gano sumarle a su marcador
      if(this.playerOneWinsRound){
        this.playerOneScore++;
        console.log(this.playerOneScore);
        
      }else{
        this.playerTwoOrAIScore++;
        console.log(this.playerTwoOrAIScore);
      }
    }else{
      console.log("round tied");  
    }
    //agrego una ronda
    this.currentRound++;
    //verificar si ya se pasaron el numero de rondas, de ser asi elegir un ganador
    if(this.currentRound > this.rounds){
      let alertmsj: string;
      if(this.playerOneScore > this.playerTwoOrAIScore){
        console.log("Player One Wins the game!");
        alertmsj = "Player One Wins the game!";       
      }else if(this.playerOneScore == this.playerTwoOrAIScore){
        console.log("ITS A TIE!!!");
        alertmsj = "ITS A TIE!!!";        
      }else{
        console.log("Player Two or Bot Wins!");
        alertmsj = "Player Two or Bot Wins!";
      }
      this.showAlert(alertmsj);
    }
  }

  showAlert(alertMsj: string){
    let alert = this.alertCtrl.create({
        title: "Game Over",
        subTitle: alertMsj,
        buttons: ['ok']
    })
    //emitir si hay ganador y si ese fue el player uno
    alert.present();
  }
}
