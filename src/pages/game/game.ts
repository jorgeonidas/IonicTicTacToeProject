import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { timeInterval } from 'rxjs/operator/timeInterval';

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {
  gameData: any;
  gametype: string;
  rounds: number = 3;
  currentRound: number = 1;
  difficulty: string = 'easy';

  playerOneScore: number;
  playerTwoOrAIScore: number;
  //scoreboard comp data
  playerOneHealth: number;
  playerTwoOrBothealth: number;
  playerOneCurrentTurn: boolean; 
  //round data
  winner: boolean;
  playerOneWinsRound: boolean;
  //countDown
  turnInterval: number;
  timeleft: number;
  timeout : any;
  toltalTurnBar : number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
    this.playerOneScore = 0;
    this.playerTwoOrAIScore = 0;
    this.winner= false;
    this.playerOneWinsRound = false;
    //barras de vida
    this.playerOneHealth = 100;
    this.playerTwoOrBothealth = 100;
    //turno actual
    //this.gametype= 'local-multiplayer';
    this.playerOneCurrentTurn = true;
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamePage');
    this.gameData = this.navParams.data;
    console.log(this.gameData);
    this.gametype = this.navParams.get('gameType');
    this.rounds = this.navParams.get('rounds');
    this.difficulty = this.navParams.get('difficulty');
    
    this.turnInterval = 5;
    this.toltalTurnBar = 100;
    this.restRoundTimer(5);
    this.startTimer();
    /* 
    //testing timer
    this.turnInterval = 5;
    this.timeout = setInterval( () =>{
      this.turnInterval--
      if(this.turnInterval == 0){
        //clearInterval(this.timeout);
        //ojo funciona para local multiplayer como haremos con singleplayer?
        switch(this.gametype){
          case 'local-multiplayer':
          this.restRoundTimer(5);
          this.playerOneCurrentTurn = !this.playerOneCurrentTurn;
          console.log("cambio de turno");
          console.log(this.playerOneCurrentTurn);
          break;
        }       
      }
      console.log(this.turnInterval);
    },
    1000);  */
    
  }
  //cambio el turno
  changeTurn(iaTinkingOrPlayeroneTurn: boolean){
    //resetear timer
    this.restRoundTimer(5);
    if(this.gametype == "singleplayer"){
      this.playerOneCurrentTurn = !iaTinkingOrPlayeroneTurn; // si la NO! esta pesando la IA es el turno del Jugador
    }else{
      this.playerOneCurrentTurn = iaTinkingOrPlayeroneTurn;
    }
  }

  setRoundWinner(value1: boolean){
    console.log("player one wins?: "+value1); 
    this.playerOneWinsRound = value1;
    this.stopTimer();  
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
        //reducimos la barra de vida del bot o player 2
        this.playerTwoOrBothealth -= Math.round(100/this.rounds);
        
      }else{
        this.playerTwoOrAIScore++;
        console.log(this.playerTwoOrAIScore);
        //reducimos la barra de vida del player1
        this.playerOneHealth -= Math.round(100/this.rounds);
      }
    }else{
      console.log("round tied");  
    }
    //agrego una ronda
    this.currentRound++;
    //verificar si ya se pasaron el numero de rondas, de ser asi elegir un ganador
    if(this.currentRound > this.rounds){
      let alertmsj: string;
      //this.stopTimer(); 
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
    }else{
      console.log("new round");
      this.restRoundTimer(5);
      this.startTimer();
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
  /*
  countDown(){
    this.turnInterval--;
    if(this.turnInterval == 0){
       clearInterval(this.timeout);
    }
    console.log(this.turnInterval);
  }*/

  restRoundTimer(time: number){
    this.timeleft = time;
  }

  startTimer(){
    //this.turnInterval = 5;
    this.timeout = setInterval( () =>{
      this.timeleft--
      this.toltalTurnBar -= 100/this.turnInterval; //testing luego le busco la proporcion
      if(this.timeleft < 0){
        //clearInterval(this.timeout);
        //ojo funciona para local multiplayer como haremos con singleplayer?
        switch(this.gametype){
          case 'local-multiplayer':
          this.restRoundTimer(5);
          this.playerOneCurrentTurn = !this.playerOneCurrentTurn;
          this.toltalTurnBar = 100;
          console.log("cambio de turno");
          console.log(this.playerOneCurrentTurn);

          break;
        }       
      }
      console.log(this.timeleft);
    },
    1000); 
  }

  stopTimer(){
    clearInterval(this.timeout);
  }
}
