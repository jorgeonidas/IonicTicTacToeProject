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

            .boardBorder {
                border: 4px solid #e8933a;
                border-radius: 15px;
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
    origBoard: string[] = ["0","1","2","3","4","5","6","7","8"];
    xChar: string = 'X';
    oChar: string = 'O';
    roundMoves: number = 0;

    alertMsj: string;

    //variables necesarias para el minmax
    iter: number = 0;
    @Input() gameType: string;
    @Input() difficulty: string;
    playerOne: boolean = true;
    isIAthinking: boolean;
    winner: boolean = false;
    @Output() isPlayerOneEvent = new EventEmitter<boolean>();
    @Output() isaWinnerEvent = new EventEmitter<boolean>();
    @Output() currentTurnEvent = new EventEmitter<boolean>();
    
    constructor(private alertCtrl: AlertController){
        console.log(this.gameType);  
        this.isIAthinking = false;    
    }

    //jugada
    onCellClickled(index: number){

        if(this.origBoard[index]!='X' && this.origBoard[index] != 'O' && !this.isIAthinking /*&& !this.winner) || this.roundMoves <= 7*/){
            
            switch(this.gameType){
               
                case "singleplayer":
                
                    let alertMsj: string;
                    //juega jugador
                    this.playerOne = true;                    
                    this.currentTurnEvent.emit(this.playerOne);
                    this.origBoard[index] = this.oChar;
                    //crear array de indices disponibles para la IA
                    let aviableSpots = this.emptyIndexies(this.origBoard);
                    console.log(aviableSpots); 
                    //necesito verificar si jugador gano
                    if(this.winning(this.origBoard, this.oChar)){
                        //jugador gano avisar al GamePage
                        this.winner = true;
                        console.log("Player wins"); 
                        alertMsj = "Player wins";
                        this.showAlert(alertMsj);

                    }else if(aviableSpots.length > 0 ){
                         //dependiendo de la dificultad elegir algoritmo
                        this.playerOne = false;
                        this.isIAthinking = true;
                        this.currentTurnEvent.emit(this.playerOne);
                        
                        //intervalo de delay entre 0.5 y  2s
                        let delay = Math.floor(Math.random() * (2000 - 500 + 1) + 500); //0.5 y 2 s
                        console.log(delay);
                        
                        //hilo para dar la sensacion de que la pc piensa
                        setTimeout(() => {
                            switch(this.difficulty){
                                case "easy":
                                    //this.singleplayerEasy(index);
                                    this.easyIA(index)
                                break;

                                case "medium":
                                    let aviableSpots = this.emptyIndexies(this.origBoard);
                                    //mezclemos las dificultades "lanzando una moneda"
                                    let moneda = Math.random()
                                    console.log(moneda);
                                    if(moneda <= 0.5){
                                        this.hardIa(this.origBoard, this.xChar);
                                    }else{
                                        this.easyIA(index);
                                    }
                                break;
                            
                            case "hard":
                                this.hardIa(this.origBoard,this.xChar);
                            break;
                            }

                            this.playerOne = true;
                            this.isIAthinking = false;
                            this.currentTurnEvent.emit(this.playerOne);

                            console.log(this.origBoard);
                        
                            if(this.winning(this.origBoard, this.xChar)){
                                //IA avisa a gamepage
                                this.winner = true;
                                console.log("IA WINS!");
                                alertMsj = "IA WINS!";
                                this.showAlert(alertMsj);                
                            }
                            
                        }, delay);
                        
                        /*
                        switch(this.difficulty){
                            case "easy":
                                //this.singleplayerEasy(index);
                                this.easyIA(index)
                            break;
                            
                            case "medium":
                                let aviableSpots = this.emptyIndexies(this.origBoard);
                                //mezclemos las dificultades "lanzando una moneda"
                                let moneda = Math.random()
                                console.log(moneda);
                                if(moneda <= 0.5){
                                    this.hardIa(this.origBoard, this.xChar);
                                }else{
                                    this.easyIA(index);
                                }
                            break;
                            
                            case "hard":
                                this.hardIa(this.origBoard,this.xChar);
                            break;
                        }

                        this.playerOne = true;
                        this.currentTurnEvent.emit(this.playerOne);
                        console.log(this.origBoard);
                        
                        if(this.winning(this.origBoard, this.xChar)){
                            //IA avisa a gamepage
                            this.winner = true;
                            console.log("IA WINS!");
                            alertMsj = "IA WINS!";
                            this.showAlert(alertMsj);                
                        }*/
                    }else{
                        console.log("TIE!");
                        alertMsj = "TIE!";
                        this.winner = false;
                        this.showAlert(alertMsj);
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

      showAlert(alertMsj: string){
        let alert = this.alertCtrl.create({
            title: "End of The Round",
            subTitle: alertMsj,
            buttons: ['ok']
        })
        //emitir si hay ganador y si ese fue el player uno
        alert.onDidDismiss(()=>{this.isPlayerOneEvent.emit(this.playerOne)//en este orden especifico! //primero quien gano: true: player1; false: plauer2 o IA
                                this.isaWinnerEvent.emit(this.winner) //luego si hubo un ganador ( winner= true) o si fue empate( winner = false ) 
                                this.resetBoard()});
        alert.present();
      }

      resetBoard(){
         this.origBoard = ["0","1","2","3","4","5","6","7","8"];
         this.roundMoves = 0;
         this.winner = false;
         this.playerOne = true;
      }

      easyIA(index){
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

}