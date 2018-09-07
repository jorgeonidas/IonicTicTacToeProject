import { Component, Input, Output, Injectable, EventEmitter } from "@angular/core";
import { AlertController } from "ionic-angular";
import { isDifferent } from "@angular/core/src/render3/util";
import { AIService } from '../../services/iaService';

@Component({
    selector: 'game-board',
    templateUrl: 'game-board.html',
    styles:[`
            ion-col{
                height: 100%%;
                background: #f9c79a;
            }
            
            .flex-col {
                display: flex;
                justify-content: center;
                align-items: center;
            }
            
            h1{
                font-size: 60px;
            }

            .X{
                color: #f26fe5;
            }
            
            .O{
                color: #0de5da;
            }

            .boardBorder {
                border: 4px solid #e8933a;
                border-radius: 15px;
                height: 100%;
                background-color: #f9c79a;
            }

            #centerCell{
                border-top: 2px solid #e8933a;
                border-left: 2px solid #e8933a;
                border-right: 2px solid #e8933a;
                border-bottom: 2px solid #e8933a;
            }

            #topLeft{
                border-right: 2px solid #e8933a;
                border-bottom: 2px solid #e8933a;
                border-radius: 12px 0px 0px 0px;
            }

            #topCenter{
                border-left: 2px solid #e8933a;
                border-right: 2px solid #e8933a;
                border-bottom: 2px solid #e8933a;
            }

            #topRight{
                border-left: 2px solid #e8933a;
                border-bottom: 2px solid #e8933a;
                border-radius: 0px 12px 0px 0px;
            }

            #centerLeft{
                border-top: 2px solid #e8933a;
                border-right: 2px solid #e8933a;
                border-bottom: 2px solid #e8933a;
            }

            #centerRight{
                border-top: 2px solid #e8933a;
                border-left: 2px solid #e8933a;
                border-bottom: 2px solid #e8933a;
            }

            #bottomLeft{
                border-top: 2px solid #e8933a;
                border-right: 2px solid #e8933a;
                border-radius: 0px 0px 0px 12px;
            }

            #bottomCenter{
                border-top: 2px solid #e8933a;
                border-left: 2px solid #e8933a;
                border-right: 2px solid #e8933a;
            }

            #bottomRight{
                border-top: 2px solid #e8933a;
                border-left: 2px solid #e8933a;
                border-radius: 0px 0px 12px 0px;
            }
        `]
})
@Injectable()
export class GameBoardComponent{
    @Input() origBoard: string[] = ["0","1","2","3","4","5","6","7","8"];
    @Output() boardChangeEvent = new EventEmitter<string[]>();
    xChar: string = 'X';
    oChar: string = 'O';
    @Input() roundMoves: number = 0;

    alertMsj: string;
    @Output() alertMsjEvent = new EventEmitter<string>();

    //variables necesarias para el minmax
    iter: number = 0;
    @Input() gameType: string;
    @Input() difficulty: string;
    @Input() playerOne: boolean = true;
    @Input() turnInterval: number;
    @Input() isGameOver: boolean;
    isIAthinking: boolean;
    @Input() winner: boolean = false;
    @Output() isPlayerOneEvent = new EventEmitter<boolean>();
    @Output() isaWinnerEvent = new EventEmitter<boolean>();
    @Output() currentTurnEvent = new EventEmitter<boolean>();

    @Input() gameStart: boolean = false;
    
    constructor(private alertCtrl: AlertController, private IA : AIService){  
        this.isIAthinking = false;
        this.isGameOver = false;    
    }

    //jugada
    onCellClickled(index: number){
        console.log(this.gameType,this.origBoard[index],this.origBoard[index],this.IA.isIaTinking() );
        
        if(this.origBoard[index]!='X' && this.origBoard[index] != 'O' && !this.IA.isIaTinking() && this.gameStart && !this.isGameOver/*&& !this.winner) || this.roundMoves <= 7*/){
            
            switch(this.gameType){
               
                case "singleplayer":

                    let alertMsj: string;
                    //juega jugador
                    this.playerOne = true;                    
                    this.currentTurnEvent.emit(/*this.isIAthinking*/this.IA.isIaTinking());
                    this.origBoard[index] = this.oChar;
                    //emito el tablero en su edo actua
                    this.boardChangeEvent.emit(this.origBoard);

                    //crear array de indices disponibles para la IA
                    let aviableSpots = this.emptyIndexies(this.origBoard);
                    console.log(aviableSpots); 
                    //necesito verificar si jugador gano
                    if(this.winning(this.origBoard, this.oChar)){
                        //jugador gano avisar al GamePage
                        this.winner = true;
                        console.log("Player wins round"); 
                        this.alertMsj = "Player wins round";
                        //this.showAlert(alertMsj);
                        //testing sending alerts from GamePage
                        this.isPlayerOneEvent.emit(this.playerOne);
                        this.alertMsjEvent.emit(this.alertMsj);
                        this.isaWinnerEvent.emit(this.winner);

                    }else if(aviableSpots.length > 0 ){
                         //dependiendo de la dificultad elegir algoritmo
                        this.playerOne = false;
                        this.isIAthinking = true; //IA esta pesando
                        this.IA.setIaTinking(this.isIAthinking);
                        this.currentTurnEvent.emit(this.IA.isIaTinking());

                        //intervalo de delay entre 0.5 y  2s}
                        console.log("From board turn Interval: "+this.turnInterval);
                        this.IA.setDelay(this.turnInterval);
                        let delay = this.IA.getDelay();
                        console.log(delay);
                        
                        //hilo para dar la sensacion de que la pc piensa
                        setTimeout(() => {
                            switch(this.difficulty){
                                case "easy":
                                    //this.singleplayerEasy(index);
                                    //this.easyIA()
                                    this.IA.easyIA(this.origBoard);
                                break;

                                case "medium":
                                    let aviableSpots = this.emptyIndexies(this.origBoard);
                                    //mezclemos las dificultades "lanzando una moneda"
                                    let moneda = Math.random()
                                    console.log(moneda);
                                    if(moneda <= 0.5){
                                        //this.hardIa(this.origBoard, this.xChar);
                                        this.IA.hardIa(this.origBoard,this.xChar);
                                    }else{
                                        //this.easyIA();
                                        this.IA.easyIA(this.origBoard);
                                    }
                                break;
                            
                                case "hard":
                                    //this.hardIa(this.origBoard,this.xChar);
                                    this.IA.hardIa(this.origBoard,this.xChar);
                                break;
                            }
                            
                            console.log(this.origBoard);
                            //gana IA?
                            if(this.winning(this.origBoard, this.xChar)){
                                //IA avisa a gamepage
                                this.winner = true;
                                console.log("IA WINS!");
                                this.alertMsj = "IA WINS!";
                                //this.showAlert(alertMsj);
                                this.isPlayerOneEvent.emit(this.playerOne);
                                this.alertMsjEvent.emit(this.alertMsj);
                                this.isaWinnerEvent.emit(this.winner);                
                            }else if(this.IA.emptyIndexies(this.origBoard).length == 0){
                                console.log("TIE!");
                                this.alertMsj = "TIE!";
                                this.winner = false;
                                //this.showAlert(alertMsj);
                                this.isPlayerOneEvent.emit(this.playerOne);
                                this.alertMsjEvent.emit(this.alertMsj);
                                this.isaWinnerEvent.emit(this.winner); 
                            }

                            this.isIAthinking = false;
                            this.IA.setIaTinking(this.isIAthinking);
                            this.currentTurnEvent.emit(this.IA.isIaTinking());
                            //this.playerOne = true;
                            
                            //this.playerOne = true;//test
                        }, delay);
                    //empato?  
                    }else{
                        console.log("TIE!");
                        this.alertMsj = "TIE!";
                        this.winner = false;
                        //this.showAlert(alertMsj);
                        this.isPlayerOneEvent.emit(this.playerOne);
                        this.alertMsjEvent.emit(this.alertMsj);
                        this.isaWinnerEvent.emit(this.winner);
                    }                   
                break;

                case "local-multiplayer":
                                       
                    let currentPlayer;
                    if(this.playerOne){
                        currentPlayer = this.oChar;
                    }else{
                        currentPlayer = this.xChar;
                    }
                    
                    this.origBoard[index] = currentPlayer;
                    
                    this.winner = this.winning(this.origBoard,currentPlayer);
                    this.roundMoves++;

                    console.log("current board state");
                    console.log("gameboardCompo",this.origBoard);
                    console.log("moves left: "+this.roundMoves);
                    
                    if( this.winner ){
                        if(this.playerOne){
                            console.log("Player One Wins Round");
                            this.alertMsj = "Player One Wins Round";     
                        }else{
                            console.log("Player Two Wins ");
                            this.alertMsj = "Player Two Wins Round";
                        }
                        
                        //this.showAlert(this.alertMsj);
                        this.isPlayerOneEvent.emit(this.playerOne);
                        this.alertMsjEvent.emit(this.alertMsj);
                        this.isaWinnerEvent.emit(this.winner);
                        this.roundMoves = 0;
                        //this.resetBoard()


                    }else if(this.roundMoves > 8 ){
                        console.log("TIE!");
                        this.alertMsj = "TIE!"
                        //this.showAlert(this.alertMsj);
                        this.isPlayerOneEvent.emit(this.playerOne);
                        this.alertMsjEvent.emit(this.alertMsj);
                        this.isaWinnerEvent.emit(this.winner)
                        //this.resetBoard()
                        this.roundMoves = 0;                 
                    }else{
                        this.playerOne = !this.playerOne;
                        this.currentTurnEvent.emit(this.playerOne);//evento que avisa cambio de turno
                        console.log(this.roundMoves);                       
                    }
                break;

                case "online-multiplayer":
                break;
                
            }
        
           
        }else{
            console.log("movimiento ilegal!");
        }      
    }

      //filtra las casillas disponibles para la IA
    emptyIndexies(board){
        return  board.filter(s => s != "O" && s != "X");
    }

    winning(board, player): boolean {
        /*console.log("checking board:" ); 
        console.log(board); */       
        if (
          (board[0] == player && board[1] == player && board[2] == player) ||
          (board[3] == player && board[4] == player && board[5] == player) ||
          (board[6] == player && board[7] == player && board[8] == player) ||
          (board[0] == player && board[3] == player && board[6] == player) ||
          (board[1] == player && board[4] == player && board[7] == player) ||
          (board[2] == player && board[5] == player && board[8] == player) ||
          (board[0] == player && board[4] == player && board[8] == player) ||
          (board[2] == player && board[4] == player && board[6] == player)
        ) {
          return true;
        } else {
          return false;
        }
      }
/////////////////////////////////////////////////////////////////////
      showAlert(alertMsj: string){
        this.isPlayerOneEvent.emit(this.playerOne);//envio evento para avisar quien gano y asi en game se encarga de pausar el tiempo de la ronda
        let alert = this.alertCtrl.create({
            title: "End of The Round",
            subTitle: alertMsj,
            buttons: ['ok']
        })
        //emitir si hay ganador y si ese fue el player uno
        alert.onDidDismiss(()=>{//this.isPlayerOneEvent.emit(this.playerOne)//en este orden especifico! //primero quien gano: true: player1; false: plauer2 o IA
                                this.isaWinnerEvent.emit(this.winner) //luego si hubo un ganador ( winner= true) o si fue empate( winner = false ) 
                                this.resetBoard()});
        alert.present();
      }
///////////////////////////////////////////////////////////////////////////////////
      resetBoard(){
         this.origBoard = ["0","1","2","3","4","5","6","7","8"];
         this.roundMoves = 0;
         this.winner = false;
         this.playerOne = true;
      }

      easyIA(){
        let aviableSpots = this.emptyIndexies(this.origBoard);
        let randIndex = aviableSpots[Math.floor(Math.random())*aviableSpots.length];
        console.log(randIndex);                            
        //la IA pone su ficha en el lugar escogido anteriormente
        this.origBoard[randIndex] = this.xChar;
      }

      minimax(reboard, player) {

        //por ahora
        let huPlayer = this.xChar;
        let aiPlayer = this.oChar;
        //
        this.iter++;
        let array = this.emptyIndexies(reboard);
        if (this.winning(reboard, huPlayer)) {
          return {
            score: -10
          };
        } else if (this.winning(reboard, aiPlayer)) {
          return {
            score: 10
          };
        } else if (array.length === 0) {
          return {
            score: 0
          };
        }
      
        var moves = [];
        for (var i = 0; i < array.length; i++) {
          var move: any = {};
          move.index = reboard[array[i]];
          reboard[array[i]] = player;
      
          if (player == aiPlayer) {
            var g = this.minimax(reboard, huPlayer);
            move.score = g.score;
          } else {
            var g = this.minimax(reboard, aiPlayer);
            move.score = g.score;
          }
          reboard[array[i]] = move.index;
          moves.push(move);
        }
      
        var bestMove;
        if (player === aiPlayer) {
          var bestScore = -10000;
          for (var i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
              bestScore = moves[i].score;
              bestMove = i;
            }
          }
        } else {
          var bestScore = 10000;
          for (var i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
              bestScore = moves[i].score;
              bestMove = i;
            }
          }
        }
        return moves[bestMove];
      }

      hardIa(board, payer){
        let iaIndex = this.minimax(board, payer).index;
        console.log("indice escogido por IA: " + iaIndex);                               
        this.origBoard[iaIndex] = payer;
      }

      public IATurn(){
        //OJO ACA NO ESTOY LLAMANDO AL IA SERVICE PARA QUE PIENSE
        let delay = Math.floor(Math.random() * (2000 - 500 + 1) + 500); //0.5 y 2 s
        console.log(delay);
        let alertMsj: string;
        setTimeout(() => {
            switch(this.difficulty){
                case "easy":
                    //this.singleplayerEasy(index);
                    this.easyIA()
                break;

                case "medium":
                    let aviableSpots = this.emptyIndexies(this.origBoard);
                    //mezclemos las dificultades "lanzando una moneda"
                    let moneda = Math.random()
                    console.log(moneda);
                    if(moneda <= 0.5){
                        this.hardIa(this.origBoard, this.xChar);
                    }else{
                        this.easyIA();
                    }
                break;
            
            case "hard":
                this.hardIa(this.origBoard,this.xChar);
            break;
            }
            
            //this.playerOne = true;
            this.isIAthinking = false;
            this.currentTurnEvent.emit(this.isIAthinking);

            console.log(this.origBoard);
        
            if(this.winning(this.origBoard, this.xChar)){
                //IA avisa a gamepage
                this.winner = true;
                console.log("IA WINS!");
                alertMsj = "IA WINS!";
                this.showAlert(alertMsj);                
            }
            //this.playerOne = true;//test
        }, delay);
      }

}