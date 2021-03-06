import { Component, Input, Output, Injectable, EventEmitter } from "@angular/core";
import { AlertController, Events } from "ionic-angular";
import { isDifferent } from "@angular/core/src/render3/util";
import { AIService } from '../../services/iaService';
import * as Constants from '../../services/Constants'
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
    
    //variable que guardara el timeout
    checkoutTimeot: any;

    constructor(private alertCtrl: AlertController, private IA : AIService, private events: Events){  
        this.isIAthinking = false;
        this.isGameOver = false;

    }


    //jugada
    onCellClickled(index: number){
        console.log(this.gameType,this.origBoard[index],this.origBoard[index],this.IA.isIaTinking() );
        
        if(this.origBoard[index]!='X' && this.origBoard[index] != 'O' && !this.IA.isIaTinking() && this.gameStart && !this.isGameOver/*&& !this.winner) || this.roundMoves <= 7*/){
            
            switch(this.gameType){
               
                case Constants.GT_SINGLEPLAYER:

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
                        console.log(Constants.PlAYER_ONE_WR); 
                        this.alertMsj = Constants.PlAYER_ONE_WR;
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

                        //intervalo de delay entre 0.5 y  2s
                        console.log("From board turn Interval: "+this.turnInterval);
                        this.IA.setDelay(this.turnInterval);
                        let checkDelay = this.IA.getDelay() + 100;
                        //console.log(checkDelay);
                        
                        //la ia ha sido comandada desde el componente game-board
                        this.IA.IATurn(this.origBoard,this.difficulty);
                        
                        //hilo para dar la sensacion de que la pc piensa
                        //TODO TENGO QUE PAUSAR ESTE HILO!
                        this.checkoutTimeot = setTimeout(() => {
                            this.checkPostIAplay();
                        }, checkDelay);

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

                case Constants.GT_LOCAL_MULTYPLAYER:
                                       
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
                            console.log(Constants.PlAYER_ONE_WR);
                            this.alertMsj = Constants.PlAYER_ONE_WR;     
                        }else{
                            console.log(Constants.PlAYER_TWO_WR);
                            this.alertMsj = Constants.PlAYER_TWO_WR;
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

                case Constants.GT_ONLINE:
                break;
                
            }
        
           
        }else{
            console.log("movimiento ilegal!");
        }      
    }
    checkPostIAplay() {
        console.log(this.origBoard);
        //gana IA?
        if (this.winning(this.origBoard, this.xChar)) {
            //IA avisa a gamepage
            this.winner = true;
            console.log("IA WINS!");
            this.alertMsj = "IA WINS!";
            //this.showAlert(alertMsj);
            this.isPlayerOneEvent.emit(this.playerOne);
            this.alertMsjEvent.emit(this.alertMsj);
            this.isaWinnerEvent.emit(this.winner);
        } else if (this.IA.emptyIndexies(this.origBoard).length == 0) {
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
    }

    /////////////////////////////////////////////////////////////////////////////////////////////

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

}