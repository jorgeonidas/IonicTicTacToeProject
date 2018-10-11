import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, PopoverController, Popover, Alert, Events, LoadingController, Platform } from 'ionic-angular';
import { timeInterval } from 'rxjs/operator/timeInterval';
import { AIService } from '../../services/iaService';
import { ConfigurationServiceDB } from '../../services/configurationdb.service';
import { Title } from '@angular/platform-browser';
import { RewardPage } from '../reward/reward';
import { AdmobServiceProvider } from '../../providers/admob-service/admob-service';

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

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private alertCtrl: AlertController, 
    private IA : AIService, 
    private cfgService: ConfigurationServiceDB,
    private popover: PopoverController,
    private admob: AdmobServiceProvider,
    private loadingCtrl : LoadingController,
    private platform: Platform,
    private events : Events) {
   
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

  setMaxPointsToWin(){
    switch (this.rounds) {
      case 1:
        this.pointsToWin = 1;
        break;
      case 3:
        this.pointsToWin = 2;
        break;
      case 5:
        this.pointsToWin = 3;
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
      if(this.gametype == 'singleplayer')
          this.IA.setIaTinking(false);
    }else{
      this.playerOneCurrentTurn = false;
      this.playerStartsGame = false;
      if(this.gametype == 'singleplayer')
        this.IA.setIaTinking(true);
    }

    return this.playerOneCurrentTurn;
  }
  //Decidir quien salie primero
  gameInitializer(){
    //this.IA.resetTimeElapsed();
    this.IA.setCmdFromGameOrBoard(false);
    //1.-Are you good enough?
    this.timeout = setTimeout(() => {
      this.playerOneDidGoFirst = this.generateFirstTurn(); //SELECCIONAMOS QUIEN VA A COMENZAR EL JUEGO
      let msj;
      if(this.playerOneCurrentTurn){//El mensaje dependiendo del tipo de juego
        msj = 'Player One Starts Game'
      }else{
        if(this.gametype=='local-multiplayer')
          msj='Player Two Starts Game';
        else if(this.gametype=='singleplayer')
          msj = 'Robot Starts The Game';
          this.IA.setIaTinking(true); //evitar que el jugador juege de primero cuando en realidad le toca a la IA
          this.IA.setCmdFromGameOrBoard(true);
          this.IA.resetTimeElapsed();
          this.IA.setTimeEpalsed(0);
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
        title: "Are you good enough?",
        enableBackdropDismiss: false
      });
      this.initialAlert.present();
    }, 2000);
    
    //2.-Ready
    this.timeout = setTimeout(()=>{
      this.initialAlert.dismiss();
      this.initialAlert = this.alertCtrl.create({
        title: "Ready",
        enableBackdropDismiss: false
      })
      this.initialAlert.present();
    },3500);
    //3.-GO!
    this.timeout = setTimeout(()=>{
      this.initialAlert.dismiss();
      this.initialAlert = this.alertCtrl.create({
        title: "GO!",
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
        console.log("Player One Wins the game!");
        this.alertMsj = "Player One Wins the game!";
        this.playerOneWinGame = true; //para saber si entra a la ruleta      
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
      this.IA.setTimeEpalsed((this.turnInterval-this.timeleft)+1);

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
          
          case 'local-multiplayer':          
            this.playerOneCurrentTurn = !this.playerOneCurrentTurn;
          break;

          case 'singleplayer':
                      
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

  IAplaying() {
    this.IA.setDelay(this.turnInterval);
    let checkDelay = this.IA.getDelay()+100;
    //tenemos que decirle a la pc que ejecute su jugada

    //la ia ha sido comandada desde la clase Game
    this.IA.setCmdFromGameOrBoard(true);
    //TODO TENGO QUE DETENER EL HILO SI HACEN PAUSA
    this.IA.IATurn(this.gameboard, this.difficulty);//La jugada de La IA se ejecuta en paralelo
    //hilo para hacer el cambio de turno y reseteo del timer

    //TODO: TENGO QUE DETENER ESTE HILO SI HACEN PAUSA
    setTimeout(() => {
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
      this.restRoundTimer();
    }
  }

  stopTimer(){
    clearInterval(this.timeout);
  }

  pauseOrResume(isPaused: boolean){
    console.log("paused: "+isPaused);
    if(isPaused){
      //pauser
      //TODO pause para el checkeador desde el gameboard component
      console.log("pausada desde Game.ts?", this.IA.getCmdFromGameOrBoard());
      

      
      console.log("DELAY DE LA IA EN ESTE MOMENTO",this.IA.getDelay());
      //TODO CASO ESPECIAL EN QUE LA IA NI SIQUIERA HA COMENZADO A PENSAR!
      if(!this.playerOneCurrentTurn && this.IA.getDelay() != null){
        this.IA.setTimeLeft();//seteo el tiempo restante que le queda para pensar
        this.IA.getTimeLeft();
        this.IA.pauseIaDelay();

        //tenemos que saber cual hilo comanda la ia para pausarlo
        if (!this.IA.getCmdFromGameOrBoard()) {
          
        }
      }
      
      this.stopTimer();
    }else if(!this.cfgService.isLeavingCurrentGame() && ! isPaused){
      console.log("DELAY DE LA IA EN ESTE MOMENTO Luego de pausar",this.IA.getDelay());
      console.log("turno del player?",this.playerOneCurrentTurn);
      
      //si la ia ni siquiera comenzo a pensar es decir que no fue pausada por ende tampoco se tiene que reanudar.
      if(!this.playerOneCurrentTurn && this.IA.getDelay() != null){
        this.IA.resumeIaDelay(this.difficulty,this.gameboard);
      }
      this.startTimer();
      
    }
  }

  leaveGame(){

    console.log("leaving");
 
    switch (this.gametype) {
      case 'singleplayer':

        if (this.playerOneWinGame) {
          let currentIndex = this.navCtrl.getActive().index;
          this.navCtrl.push(RewardPage, {}, { animate: false }).then(() => {
            this.navCtrl.remove(currentIndex); //remuevo esta pagina del stack
          });
        } else {
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
    
      case 'local-multiplayer':
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
      
      if (this.gametype == 'local-multiplayer')
        msj = 'Player Two Starts Game';
      else if (this.gametype == 'singleplayer'){
        msj = 'Robot Starts The Game'
        this.playerStartsGame = false;
        this.IA.setIaTinking(true);//evitar que el jugador marque primero en el turno de la IA
      }

    } else if(!poneWins && this.winner) {//player 2 o bot gano
      this.playerStartsGame = true;
      this.playerOneCurrentTurn = true;
      this.IA.setIaTinking(false);
      //this.playerStartsGame = false;
      msj = 'Player One Starts Game';

    }else{//caso empate//comienza el que no comenzo de primero
      if(this.playerOneDidGoFirst){//si player uno arranco de primero/ el oponente comienza la segunda ronda
        this.playerOneCurrentTurn = false;
        this.playerStartsGame = false;
        this.IA.setIaTinking(true);
        if (this.gametype == 'local-multiplayer')
          msj = 'Player Two Starts Game';
        else if (this.gametype == 'singleplayer')
          msj = 'Robot Starts The Game'
      }else{//
        this.playerOneCurrentTurn = true;
        msj = 'Player One Starts Game';
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
}
