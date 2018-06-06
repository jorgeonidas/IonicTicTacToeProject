import { Component, Input, Output, Injectable, EventEmitter } from "@angular/core";
import { AlertController } from "ionic-angular";
import { isDifferent } from "@angular/core/src/render3/util";

@Component({
    selector: 'game-board',
    templateUrl: 'game-board.html',
    styles:[`
            ion-col{
                height: 100px;
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
        `]
})
@Injectable()
export class GameBoardComponent{
    origBoard: string[] = ["0","1","2","3","4","5","6","7","8"];
    xChar: string = 'X';
    oChar: string = 'O';
    roundMoves: number = 0;

    alertMsj: string;

    @Input() gameType: string;
    @Input() difficulty: string;
    playerOne: boolean = true;
    winner: boolean = false;
    @Output() isPlayerOneEvent = new EventEmitter<boolean>();
    @Output() isaWinnerEvent = new EventEmitter<boolean>();
    
    constructor(private alertCtrl: AlertController){
        
        
    }

    //jugada
    onCellClickled(index: number){

        if(this.origBoard[index]!='X' && this.origBoard[index] != 'O' /*&& !this.winner) || this.roundMoves <= 7*/){
            
            switch(this.gameType){
               
                case "singleplayer":
                    //dependiendo de la dificultad elegir algoritmo
                    switch(this.difficulty){
                        case "easy":
                            //jugador pone su marca
                            this.origBoard[index] = this.xChar;
                            //crear array de indices disponibles para la IA
                            let aviableSpots = this.emptyIndexies(this.origBoard);
                            console.log(aviableSpots);                            
                            //la IA escoge uno al azar
                            let randIndex = aviableSpots[Math.floor(Math.random())*aviableSpots.length];
                            console.log(randIndex);                            
                            //la IA pone su ficha en el lugar escogido anteriormente
                            this.origBoard[randIndex] = this.oChar;
                        break;                       
                    }

                break;

                case "local-multiplayer":
                    let currentPlayer;
                    if(this.playerOne){
                        currentPlayer = this.xChar;
                    }else{
                        currentPlayer = this.oChar;
                    }
                    
                    this.origBoard[index] = currentPlayer;
                    
                    this.winner = this.winning(this.origBoard,currentPlayer);
                    this.roundMoves++;

                    if( this.winner ){
                        if(this.playerOne){
                            console.log("Player One Wins");
                            this.alertMsj = "Player One Wins";     
                        }else{
                            console.log("Player Two Wins");
                            this.alertMsj = "Player Two Wins";
                        }
                        
                        this.showAlert(this.alertMsj); 

                    }else if(this.roundMoves > 8 ){
                        console.log("TIE!");
                        this.alertMsj = "TIE!"

                        this.showAlert(this.alertMsj);
                                              
                    }else{
                        this.playerOne = !this.playerOne;
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

      showAlert(alertMsj: string){
        let alert = this.alertCtrl.create({
            title: "End of The Round",
            subTitle: alertMsj,
            buttons: ['ok']
        })
        //emitir si hay ganador y si ese fue el player uno
        alert.onDidDismiss(()=>{this.isPlayerOneEvent.emit(this.playerOne)//en este orden especifico!
                                this.isaWinnerEvent.emit(this.winner)
                                this.resetBoard()});
        alert.present();
      }

      resetBoard(){
         this.origBoard = ["0","1","2","3","4","5","6","7","8"];
         this.roundMoves = 0;
         this.winner = false;
         this.playerOne = true;
      }
}