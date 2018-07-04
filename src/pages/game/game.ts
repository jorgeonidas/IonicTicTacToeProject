import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, PopoverController, Popover, Alert } from 'ionic-angular';
import { timeInterval } from 'rxjs/operator/timeInterval';
import { AIService } from '../../services/iaService';
import { ConfigurationServiceDB } from '../../services/configurationdb.service';
import { Title } from '@angular/platform-browser';

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

  //portrait
  portraitOne: string;
  portraitTwo: string;

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
  //
  initialAlert : Alert;
  gameDidStart: boolean;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private alertCtrl: AlertController, 
    private IA : AIService, 
    private cfgService: ConfigurationServiceDB,
    private popover: PopoverController) {
    this.playerOneScore = 0;
    this.playerTwoOrAIScore = 0;
    this.winner = false;
    this.playerOneWinsRound = false;
    //barras de vida
    this.playerOneHealth = 100;
    this.playerTwoOrBothealth = 100;
    //turno actual
    //this.gametype= 'local-multiplayer';
    this.playerOneCurrentTurn = true;
    //no estoy dejando el juego
    this.cfgService.setLeavingCurrentGame(false);


    this.gameData = this.navParams.data;
    console.log(this.gameData);
    this.gametype = this.navParams.get('gameType');
    this.rounds = this.navParams.get('rounds');
    this.difficulty = this.navParams.get('difficulty');
    this.portraitOne = this.navParams.get('portraitOne');
    this.portraitTwo = this.navParams.get('portraitTwo');
    console.log(this.portraitOne, this.portraitTwo);


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
    this.gameDidStart = false;
    //ACA IMPLEMENTO TIME PRE JUEGO
    this.gameInitializer();
    this.toltalTurnBar = 100;

  }

  ionViewDidLoad() {
    
    
  }

  gameInitializer(){
    //1.-Are you good enough?
    this.timeout = setTimeout(() => {
      this.initialAlert = this.alertCtrl.create({
        title: "Are you good enough?",
        enableBackdropDismiss: false
      });
      this.initialAlert.present();
    }, 1000);
    
    //2.-Ready
    this.timeout = setTimeout(()=>{
      this.initialAlert.dismiss();
      this.initialAlert = this.alertCtrl.create({
        title: "Ready",
        enableBackdropDismiss: false
      })
      this.initialAlert.present();
    },1500);
    //3.-GO!
    this.timeout = setTimeout(()=>{
      this.initialAlert.dismiss();
      this.initialAlert = this.alertCtrl.create({
        title: "GO!",
        enableBackdropDismiss: false
      })
      this.initialAlert.present();
    },3000);
    //START GAME!
    this.timeout = setTimeout(()=>{
      this.initialAlert.dismiss();
      this.restRoundTimer();
      this.startTimer();
      this.gameDidStart = true;
    },4000)
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
        this.alertMsj = "Its A Draw!!!";       
      }else{
        console.log("Player Two or Bot Wins!");
        if(this.gametype=="singleplayer")
          this.alertMsj = "Robot The Wins Game!";
        else
          this.alertMsj = "Player Two Wins The Game!"
      }

      this.showAlert(this.alertMsj);
    }else{ //Nueva ronda
      //testeando con el fin de hacer un nuevo alert que reinicie el round
      if(this.gametype=='singleplayer' && !this.playerOneWinsRound){
        console.log("singleplayer result: "+this.winner+" | true: IA win, false: ITS A DRAW");       
        if(this.winner){
          this.alertMsj = "Robot wins the round";
        }else{
          this.alertMsj = "Round Draw!";
        }
      }
      this.showAlert(this.alertMsj);
      console.log("new round");
    }
  }

  showAlert(alertMsj: string){

    let alertPop : Popover = this.popover.create('ModalGameAlertPage',
    {
      'message': alertMsj,
      'currentRound':this.currentRound,
      'totalRounds': this.rounds
    },{ enableBackdropDismiss: false });

    alertPop.onDidDismiss((data)=>{
      console.log("continue:true, end:false =>" +data);
      if(data != null){
        if(data){
          this.resetBoard();
          this.restRoundTimer();
          this.startTimer();
        }else{
          console.log('finishing game');
          this.leaveGame();
        }
      }
      
    });
    alertPop.present();
  }

  restRoundTimer(){
    console.log("reset timer");    
    this.toltalTurnBar = 100;
    this.timeleft = this.turnInterval + 1;  
  }

  resetBoard(){
    this.gameboard = ["0","1","2","3","4","5","6","7","8"];
    console.log("gameboard",this.gameboard);
    this.winner = false;
    this.playerOneCurrentTurn = true;

  }

  startTimer(){
    this.timeout = setInterval( () =>{
      this.timeleft--
      //console.log(this.timeleft);
      this.toltalTurnBar -= Math.round(100/this.turnInterval); //testing luego le busco la proporcion
      //console.log(this.toltalTurnBar);

      if(this.timeleft == 0){
        //clearInterval(this.timeout);
        //ojo funciona para local multiplayer como haremos con singleplayer?
        this.restRoundTimer();

        switch(this.gametype){
          
          case 'local-multiplayer':          
            this.playerOneCurrentTurn = !this.playerOneCurrentTurn;
          break;

          case 'singleplayer':          
            if (this.playerOneCurrentTurn) {
              this.playerOneCurrentTurn = !this.playerOneCurrentTurn;
              this.IA.setDelay(this.turnInterval)
              //tenemos que decirle a la pc que ejecute su jugada
              this.IA.IATurn(this.gameboard, this.difficulty);//La jugada de La IA se ejecuta en paralelo
              //hilo para hacer el cambio de turno y reseteo del timer
              setTimeout(() => {
                console.log("board despuesd que IA juega: " + this.gameboard);
                console.log("espacios disponibles: ",this.IA.emptyIndexies(this.gameboard).length);
                
                if (this.IA.winning(this.gameboard, 'X')) {//si gana 
                  console.log("IA WINS!");
                  //aca seteo score!!!!!!!!
                  this.setRoundWinner(false);
                  this.winOrTie(true);
                } else if (this.IA.emptyIndexies(this.gameboard).length == 0) {//si empata
                  console.log("IA Puts a Draw");
                  this.setRoundWinner(false);
                  this.winOrTie(false);
                } else { //caso contrario el juego continua
                  
                  this.playerOneCurrentTurn = !this.playerOneCurrentTurn;
                  this.restRoundTimer();
                }
              }, this.IA.getDelay()+100); //para que lo ejecute justo despues del movimiento de la pc          
            }              
          break;
        }       
      }     
    },
    1000); 
  }

  checkGameAftherIA(){
    
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

  leaveGame(){
    //this.navCtrl.popToRoot({animate:false}); //TODO No elimina transicion
    //this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length()-1),{animate: false});//hacemos 2 niveles pop ()
    console.log("leaving");
    this.navCtrl.pop({animate:false});
  }
}
