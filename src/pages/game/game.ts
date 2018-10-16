import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, PopoverController, Popover, Alert, Events, LoadingController, Platform } from 'ionic-angular';
import { AIService } from '../../services/iaService';
import { ConfigurationServiceDB } from '../../services/configurationdb.service';
import { RewardPage } from '../reward/reward';
import { AdmobServiceProvider } from '../../providers/admob-service/admob-service';

import * as Constants from '../../services/Constants';
import { OriginatorService } from '../../services/originatorService';

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {

  gameData: any;
  gametype: string;
  rounds: number = 3;
  pointsToWin : number;
  currentRound: number = 1;
  difficulty: string = 'easy';

  //portrait
  portraitOne: string;
  portraitTwo: string;

  playerOneScore: number;
  playerTwoOrAIScore: number;
  isGameOver: boolean;
  //scoreboard comp data
  playerOneHealth: number;
  playerTwoOrBothealth: number;
  playerOneCurrentTurn: boolean; //Si el turno actual es del primer player o el segundo-bot
  playerOneDidGoFirst: boolean;
  //round data
  winner: boolean;
  playerOneWinsRound: boolean;
  alertMsj: string; //quien gana y quien pierde
  playerOneWinGame : boolean;
  playerStartsGame : boolean; 
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
  //timer checkout 
  checkoutTimeot: any;
  //enable pause
  pauseEnable: boolean;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private alertCtrl: AlertController, 
    private IA : AIService, 
    private cfgService: ConfigurationServiceDB,
    private popover: PopoverController,
    private admob: AdmobServiceProvider,
    private loadingCtrl : LoadingController,
    private platform: Platform,
    private events : Events,
    /*servicio para guardar estado*/
    private originator : OriginatorService) {
   
      platform.ready().then(()=>{
        //prepara y muestra add
        this.admob.prepareInterstitialAd();
    
      });

      this.playerStartsGame = false; 
  }

  ionViewDidLoad() {
    this.playerOneScore = 0;
    this.playerTwoOrAIScore = 0;
    
    this.winner = false;
    this.playerOneWinsRound = false;
    this.playerOneWinGame = false;
    //barras de vida
    this.playerOneHealth = 100;
    this.playerTwoOrBothealth = 100;
    //turno actual
    //this.gametype= 'local-multiplayer';
    this.playerOneCurrentTurn = true;         //OJO!
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
    this.isGameOver = false;
    this.setMaxPointsToWin();

    //habilitar pausa
    this.pauseEnable = true;

    switch (this.difficulty) {
      case Constants.DIF_EASY:
        this.turnInterval = Constants.EASY_INTERVAL;
        break;

      case Constants.DIF_MEDIUM:
        this.turnInterval = Constants.MEDIUM_INTERVAL;
        break;

      case Constants.DIF_HARD:
        this.turnInterval = Constants.HARD_INTERVAL;
        break;

      default:
        break;
    }
    console.log("turn interval: " + this.turnInterval);
    this.gameDidStart = false;
    //ACA IMPLEMENTO TIME PRE JUEGO
    this.gameInitializer();
    this.toltalTurnBar = Constants.TOTAL_TURN_BAR;
    
  }

  setMaxPointsToWin(){
    switch (this.rounds) {
      case Constants.SHORT_GAME:
        this.pointsToWin = Constants.SHORT_GAME_WINS;
        break;
      case Constants.NORMAL_GAME:
        this.pointsToWin = Constants.NORMAL_GAME_WINS;
        break;
      case Constants.LONG_GAME:
        this.pointsToWin = Constants.LONG_GAME_WINS;
        break;
      
      default:
        break;
    }

    console.log("Points to win", this.pointsToWin);
    
  }

  generateFirstTurn(){
    let moneda = Math.random();
    if(moneda <= 0.5){
      this.playerOneCurrentTurn = true;
      this.playerStartsGame = true;
      if(this.gametype == Constants.GT_SINGLEPLAYER)
          this.IA.setIaTinking(false);
    }else{
      this.playerOneCurrentTurn = false;
      this.playerStartsGame = false;
      if(this.gametype == Constants.GT_SINGLEPLAYER){
        this.IA.setIaTinking(true);
        this.pauseEnable = false;
      }
    }

    return this.playerOneCurrentTurn;
  }
  //Decidir quien salie primero
  gameInitializer(){
    //1.-Are you good enough?
    this.timeout = setTimeout(() => {
      this.playerOneDidGoFirst = this.generateFirstTurn(); //SELECCIONAMOS QUIEN VA A COMENZAR EL JUEGO
      let msj;
      if(this.playerOneCurrentTurn){//El mensaje dependiendo del tipo de juego
        msj = Constants.PLAYER_ONE_STARTS;
      }else{
        if(this.gametype==Constants.GT_LOCAL_MULTYPLAYER)
          msj= Constants.PLAYER_TWO_STARTS
        else if(this.gametype==Constants.GT_SINGLEPLAYER){
          msj = Constants.ROBOT_STARTS;
          this.IA.setIaTinking(true); //evitar que el jugador juege de primero cuando en realidad le toca a la IA
        }
      }
      this.initialAlert = this.alertCtrl.create({
        title: msj,
        enableBackdropDismiss: false
      });
      this.initialAlert.present();
    }, 1000);
    this.timeout = setTimeout(() => {
      this.initialAlert.dismiss();
      this.initialAlert = this.alertCtrl.create({
        title: Constants.MSJ_1,
        enableBackdropDismiss: false
      });
      this.initialAlert.present();
    }, 2000);
    
    //2.-Ready
    this.timeout = setTimeout(()=>{
      this.initialAlert.dismiss();
      this.initialAlert = this.alertCtrl.create({
        title: Constants.MSJ_2,
        enableBackdropDismiss: false
      })
      this.initialAlert.present();
    },3500);
    //3.-GO!
    this.timeout = setTimeout(()=>{
      this.initialAlert.dismiss();
      this.initialAlert = this.alertCtrl.create({
        title: Constants.MSJ_3,
        enableBackdropDismiss: false
      })
      this.initialAlert.present();
    },4000);
    //START GAME!
    this.timeout = setTimeout(()=>{
      this.initialAlert.dismiss();
      this.restRoundTimer();
      this.startTimer();
      this.gameDidStart = true;
    },5000);
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
    if(this.gametype == Constants.GT_SINGLEPLAYER){
      this.playerOneCurrentTurn = !iaTinkingOrPlayeroneTurn; // si la NO! esta pesando la IA es el turno del Jugador
      //habilito y desabilito boton de pausa dependiendo del turno en singleplayer solamente
      if(this.playerOneCurrentTurn){
        this.pauseEnable = true;
      }else{
        this.pauseEnable = false;
      }
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
    if(!this.winner)
      this.playerOneWinsRound = false;

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
    //Asigno quien va a comenzar siguiente ronda
    //verificar si ya se pasaron el numero de rondas, de ser asi elegir un ganador //UPDATE: Si alguno de los dos jugadores alcanzaron la maxima puntuacion
    if(this.currentRound > this.rounds || (this.playerOneScore == this.pointsToWin || this.playerTwoOrAIScore == this.pointsToWin)){
      this.isGameOver = true; //El juegos e termino esto le avisara al PopUp
      //victoria o empate
      if(this.playerOneScore > this.playerTwoOrAIScore){
        console.log(Constants.PlAYER_ONE_WG);
        this.alertMsj = Constants.PlAYER_ONE_WG;
        this.playerOneWinGame = true; //para saber si entra a la ruleta      
      }else if(this.playerOneScore == this.playerTwoOrAIScore){
        console.log("ITS A TIE!!!");
        this.alertMsj = Constants.TIE;       
      }else{
        console.log("Player Two or Bot Wins!");
        if(this.gametype == Constants.GT_SINGLEPLAYER)
          this.alertMsj = Constants.ROBOT_WG;
        else
          this.alertMsj = Constants.PlAYER_TWO_WG;
      }

      this.showAlert(this.alertMsj);
    }else{ //Nueva ronda
      //testeando con el fin de hacer un nuevo alert que reinicie el round
      if(this.gametype == Constants.GT_SINGLEPLAYER && !this.playerOneWinsRound){
        console.log("singleplayer result: "+this.winner+" | true: IA win, false: ITS A DRAW");       
        if(this.winner){
          this.alertMsj = Constants.ROBOT_WR;
        }else{
          this.alertMsj = Constants.ROUND_TIE;
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
      'totalRounds': this.rounds,
      'gameOver' : this.isGameOver
    },{ enableBackdropDismiss: false });

    alertPop.onDidDismiss((data)=>{
      console.log("continue:true, end:false =>" +data);
      if(data != null){
        if(data){
          this.resetBoard();
          //this.restRoundTimer();
          //this.startTimer();
          this.setNextRound(this.playerOneWinsRound);//setear nuevo round
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
    //this.winner = false;
    this.playerOneCurrentTurn = true;

  }

  startTimer(){
    this.timeout = setInterval( () =>{
      this.timeleft--
      //para evitar el cero (0)
      let timeEpalsed = (this.turnInterval-this.timeleft)+1;
      //si termino la cuenta para evitar valores negativos
      if(timeEpalsed > this.turnInterval)
        timeEpalsed = 0;

      //console.log("timeleft",this.timeleft);
      
      //console.log(this.timeleft);
      this.toltalTurnBar -= Math.round(100/this.turnInterval); //testing luego le busco la proporcion
      //console.log(this.toltalTurnBar);
      
      //CASO ESPECIAL:SI LA IA COMIENZA EL JUEGO?
      if(this.timeleft == this.turnInterval && (!this.playerStartsGame && this.IA.emptyIndexies(this.gameboard).length == 9 ) && this.gametype == 'singleplayer' ){
        console.log('IA Plays First!');
        this.IAplaying();
      }
      if(this.timeleft == 0){
        //this.IA.resetTimeElapsed();
        //clearInterval(this.timeout);
        //ojo funciona para local multiplayer como haremos con singleplayer?
        this.restRoundTimer();

        switch(this.gametype){
          
          case Constants.GT_LOCAL_MULTYPLAYER:          
            this.playerOneCurrentTurn = !this.playerOneCurrentTurn;
          break;

          case Constants.GT_SINGLEPLAYER:
                      
            if (this.playerOneCurrentTurn) {
              this.playerOneCurrentTurn = !this.playerOneCurrentTurn;
              this.IAplaying();    
            }              
          break;
        }       
      }     
    },
    1000); 
  }

  /*jugada de la Ia comandada deste esta clase*/
  IAplaying() {
    this.IA.setDelay(this.turnInterval);
    let checkDelay = this.IA.getDelay()+100;
    //tenemos que decirle a la pc que ejecute su jugada

    //TODO TENGO QUE DETENER EL HILO SI HACEN PAUSA
    this.IA.IATurn(this.gameboard, this.difficulty);//La jugada de La IA se ejecuta en paralelo
    //hilo para hacer el cambio de turno y reseteo del timer

    //TODO: TENGO QUE DETENER ESTE HILO SI HACEN PAUSA
    this.checkoutTimeot = setTimeout(() => {   
      this.checkIAPostPlay();
    }, checkDelay); //para que lo ejecute justo despues del movimiento de la pc   
  }

  checkIAPostPlay() {
    console.log("board despuesd que IA juega: " + this.gameboard);
    console.log("espacios disponibles: ", this.IA.emptyIndexies(this.gameboard).length);
    
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
      
      if(this.playerOneCurrentTurn)
        this.pauseEnable = true;
      
      this.restRoundTimer();
    }
    //
  }

  stopTimer(){
    clearInterval(this.timeout);
  }
  /*Pausar y resumir el juego, primero pausa la ia dada las condicones si ha empezado a pensar o no
  luego pausa el hilo que lo esta chequeando en ese momento */
  pauseOrResume(isPaused: boolean){
    console.log("paused: "+isPaused);
    if(isPaused){
      //pauser
      //TODO pause para el checkeador desde el gameboard component
      console.log("DELAY DE LA IA EN ESTE MOMENTO",this.IA.getDelay());

      this.stopTimer();
    }else if(!this.cfgService.isLeavingCurrentGame() && ! isPaused){
      console.log("DELAY DE LA IA EN ESTE MOMENTO Luego de pausar",this.IA.getDelay());
      console.log("turno del player?",this.playerOneCurrentTurn);
 
      //reanudo el timer
      this.startTimer();
      
    }
  }

  leaveGame(){

    console.log("leaving");
    //Primero contar partidas jugadas en la dificultad actual y tipo de juego actual ('singleplayer' o 'local-multiplayer')
    this.originator.increaseGamesPlayed(this.difficulty,this.gametype);
    switch (this.gametype) {
      case Constants.GT_SINGLEPLAYER:       

        if (this.playerOneWinGame) {

          //ya que el player one gano incremenetamos las partidas ganadas en la dificultad actual
          this.originator.increaseWins(this.difficulty);

          let currentIndex = this.navCtrl.getActive().index;
          this.navCtrl.push(RewardPage, {}, { animate: false }).then(() => {
            this.navCtrl.remove(currentIndex); //remuevo esta pagina del stack
          });
        } else {

          //ya que el player perdio incrementamos la cantidad de partidas perdidas
          if(this.winner)
            this.originator.increaseloses(this.difficulty);

          //si no es un navegador
          if (this.admob.cordovaAviable) {
            //si la publicidad no falla en cargar
            if (!this.admob.failToLoadInterstitial) {
              this.admob.showInterstitialAd().onAdDismiss().subscribe(() => {
                this.navCtrl.pop({ animate: false });
              }, e => {
                console.log(e);
                this.navCtrl.pop({ animate: false });

              });
            } else {
              this.navCtrl.pop({ animate: false });
            }
          } else {
            this.navCtrl.pop({ animate: false });
          }
        }
        break;
    
      case Constants.GT_LOCAL_MULTYPLAYER:
        //si no es un navegador
        if (this.admob.cordovaAviable) {
          //si la publicidad no falla en cargar
          if (!this.admob.failToLoadInterstitial) {
            this.admob.showInterstitialAd().onAdDismiss().subscribe(() => {
              this.navCtrl.pop({ animate: false });
            }, e => {
              console.log(e);
              this.navCtrl.pop({ animate: false });

            });
          } else {
            this.navCtrl.pop({ animate: false });
          }
        } else {
          this.navCtrl.pop({ animate: false });
        }
        break;
      
      default:
        break;
    }


    //TODO: SOLO FALTARIA EL CASO PARA MULTIPLAYER ONLINE

  }

  setNextRound(poneWins: boolean) {
    let msj;
    this.gameDidStart = false;
    this.restRoundTimer()
    this.stopTimer();
    
    console.log("El jugador 1 gano?" + poneWins);
    console.log("hubo ganador?" + this.winner);
    
    if (poneWins) {//player 1 gano
      this.playerOneCurrentTurn = false;
      
      if (this.gametype == Constants.GT_LOCAL_MULTYPLAYER)
        msj = Constants.PLAYER_TWO_STARTS;
      else if (this.gametype == Constants.GT_SINGLEPLAYER){
        msj = Constants.ROBOT_STARTS;
        this.playerStartsGame = false;
        //ia piensa no puedo pausar ( caso especial que comienza de primero el round)
        this.pauseEnable = false;
        this.IA.setIaTinking(true);//evitar que el jugador marque primero en el turno de la IA
      }

    } else if(!poneWins && this.winner) {//player 2 o bot gano
      this.playerStartsGame = true;
      this.playerOneCurrentTurn = true;
      this.pauseEnable = true;
      this.IA.setIaTinking(false);
      //this.playerStartsGame = false;
      msj = Constants.PLAYER_ONE_STARTS;

    }else{//caso empate//comienza el que no comenzo de primero
      if(this.playerOneDidGoFirst){//si player uno arranco de primero/ el oponente comienza la segunda ronda
        this.playerOneCurrentTurn = false;
        this.playerStartsGame = false; 
        if (this.gametype == Constants.GT_LOCAL_MULTYPLAYER)
          msj = Constants.PLAYER_TWO_STARTS;
        else if (this.gametype == Constants.GT_SINGLEPLAYER)
          msj = Constants.ROBOT_STARTS;
          this.IA.setIaTinking(true);
      }else{//
        this.playerOneCurrentTurn = true;
        msj = Constants.PLAYER_ONE_STARTS;
        this.playerStartsGame = true;
        this.IA.setIaTinking(false);
      }     
    }
    //reseteamos si hubo ganador ya que preguntamos
    this.winner = false;
    this.playerOneDidGoFirst = this.playerOneCurrentTurn;//guardo la variable de quien comenzo primero en caso de otro empate

    let alert = this.alertCtrl.create({
      title: msj,
      enableBackdropDismiss: false
    });

    alert.present();
    this.timeout = setTimeout(() => {
      alert.dismiss();
      this.gameDidStart = true;
      this.startTimer();
    }, 1000);
  }
/*Se dispara cuando esta pagina deja de ser la activa
solo queremos ver el estado actual de la applicacion */
  ionViewDidLeave(){
    console.log(this.originator.getState());
  }
}
