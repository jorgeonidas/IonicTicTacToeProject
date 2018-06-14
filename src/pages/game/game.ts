import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { timeInterval } from 'rxjs/operator/timeInterval';
import { AIService } from '../../services/iaService';
import { ConfigurationService } from '../../services/configuration.service';

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
  alertMsj: string; //quien gana y quien pierde
  //countDown
  turnInterval: number;
  timeleft: number;
  timeout : any;
  toltalTurnBar : number;
  //gameboard para llamar a la IA
  gameboard: string[] = ["0","1","2","3","4","5","6","7","8"];
  moves = 0;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private alertCtrl: AlertController, 
    private IA : AIService, 
    private cfgService: ConfigurationService) {
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
    //no estoy dejando el juego
    this.cfgService.setLeavingCurrentGame(false);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamePage');
    this.gameData = this.navParams.data;
    console.log(this.gameData);
    this.gametype = this.navParams.get('gameType');
    this.rounds = this.navParams.get('rounds');
    this.difficulty = this.navParams.get('difficulty');
    
    switch (this.difficulty) {
      case 'easy':
        this.turnInterval = 6;
        break;

      case 'medium':
        this.turnInterval = 4;
        break;

      case 'hard':
        this.turnInterval = 2;
        break;
    
      default:
        break;
    } 
    console.log("turn interval: " + this.turnInterval);

    this.toltalTurnBar = 100;
    this.restRoundTimer();
    this.startTimer();
    
  }

  setCurrentBoardStatus(board: string[]){
    this.gameboard = board;
    console.log("board from game");
    console.log(this.gameboard); 
  }

  //cambio el turno
  changeTurn(iaTinkingOrPlayeroneTurn: boolean){
    console.log("change turn");
    
    //resetear timer
    this.restRoundTimer();
    if(this.gametype == "singleplayer"){
      this.playerOneCurrentTurn = !iaTinkingOrPlayeroneTurn; // si la NO! esta pesando la IA es el turno del Jugador
    }else{
      this.playerOneCurrentTurn = iaTinkingOrPlayeroneTurn;
    }
  }

  setAlertMsj(msj: string){
    this.alertMsj = msj;
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
      //victoria o empate
      if(this.playerOneScore > this.playerTwoOrAIScore){
        console.log("Player One Wins the game!");
        this.alertMsj = "Player One Wins the game!";       
      }else if(this.playerOneScore == this.playerTwoOrAIScore){
        console.log("ITS A TIE!!!");
        this.alertMsj = "ITS A TIE!!!";       
      }else{
        console.log("Player Two or Bot Wins!");
        if(this.gametype=="singleplayer")
          this.alertMsj = "Robot The Game!";
        else
          this.alertMsj = "Player Wins The Game!"
      }

      this.showAlert(this.alertMsj);
    }else{ //Nueva ronda
      //testeando con el fin de hacer un nuevo alert que reinicie el round
      if(this.gametype=='singleplayer' && !this.playerOneWinsRound)
        if(this.winner){
          this.alertMsj = "Robot wins the round";
        }else{
          this.alertMsj = "Round Tie!";
        }
        
      this.showAlert(this.alertMsj);
      console.log("new round");
    }
  }

  showAlert(alertMsj: string){
    let alert = this.alertCtrl.create({
        title: "End Of Round",
        subTitle: alertMsj,
        buttons: ['ok']
    })
    alert.onDidDismiss(()=>{
      if(this.currentRound <= this.rounds){
        this.resetBoard();
        this.restRoundTimer();
        this.startTimer();
      }else{
        this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length()-3));//hacemos 2 niveles pop ()
      }
    });
    alert.present();
  }

  restRoundTimer(){
    console.log("reset timer");    
    this.toltalTurnBar = 100;
    this.timeleft = this.turnInterval + 1;  
  }

  resetBoard(){
    this.gameboard = ["0","1","2","3","4","5","6","7","8"];
    this.winner = false;
    //this.moves = 0;
    this.playerOneCurrentTurn = true;

  }

  startTimer(){
    this.timeout = setInterval( () =>{
      this.timeleft--
      console.log(this.timeleft);
      this.toltalTurnBar -= Math.round(100/this.turnInterval); //testing luego le busco la proporcion
      //console.log(this.toltalTurnBar);

      if(this.timeleft == 0){
        //clearInterval(this.timeout);
        //ojo funciona para local multiplayer como haremos con singleplayer?
        this.restRoundTimer();

        switch(this.gametype){
          
          case 'local-multiplayer':          
          this.playerOneCurrentTurn = !this.playerOneCurrentTurn;
          //console.log("cambio de turno");
          //console.log(this.playerOneCurrentTurn);
          break;

          case 'singleplayer':          
            if(this.playerOneCurrentTurn){
              this.playerOneCurrentTurn = !this.playerOneCurrentTurn;
              this.IA.setDelay(this.turnInterval)
              //hilo para hacer el cambio de turno y reseteo del timer
              setTimeout(()=>{
                this.playerOneCurrentTurn = !this.playerOneCurrentTurn;
                this.restRoundTimer();
                if(this.IA.winning(this.gameboard,'X')){
                  console.log("IA WINS!");
                  //aca seteo score!!!!!!!!/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  this.setRoundWinner(false);
                  this.winOrTie(true);             
                }
              },
                this.IA.getDelay()+100); //para que lo ejecute justo despues del movimiento de la pc
                                          
              //tenemos que decirle a la pc que ejecute su jugada
              this.IA.IATurn(this.gameboard, this.difficulty);
              this.restRoundTimer();
              console.log(this.gameboard);
            }
            //this.playerOneCurrentTurn = !this.playerOneCurrentTurn;                 
          break;
        }       
      }     
    },
    1000); 
  }

  stopTimer(){
    clearInterval(this.timeout);
  }

  pauseOrResume(isPaused: boolean){
    console.log("paused: "+isPaused);
    if(isPaused){
      this.stopTimer()
    }else if(!this.cfgService.isLeavingCurrentGame() && ! isPaused){
      this.startTimer();
    }
  }
}
