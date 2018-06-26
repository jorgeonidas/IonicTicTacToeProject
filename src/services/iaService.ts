export class AIService{
    //despues personalizaremos
    xChar = 'X';
    oChar = 'O';
    isIAthinking: boolean;
    delay : number;

    setDelay(time: number){
        let maxDelay = (time*1000)/2;
        let minDelay = 1500;
        this.delay = Math.floor(Math.random() * (maxDelay - minDelay + 1) + minDelay);
        console.log("delay "+ this.delay);
        
    }

    getDelay(){
        return this.delay;
    }

    constructor(){
        this.isIAthinking = false;
    }
    //necesito una funcion para que la ia juegue desde aca

    IATurn(board, difficulty){
        this.setIaTinking(true);
        console.log("IA SERVICE PIENSA: " + this.isIaTinking());
        
        //let delay = Math.floor(Math.random() * (5000 - 2000 + 1) + 2000); //0.5 y 2 s
        //console.log(delay);

        setTimeout(() => {
            switch(difficulty){
                case "easy":
                    //this.singleplayerEasy(index);
                    //this.easyIA()
                    this.easyIA(board);
                break;

                case "medium":
                    //mezclemos las dificultades "lanzando una moneda"
                    let moneda = Math.random()
                    console.log(moneda);
                    if(moneda <= 0.5){
                        //this.hardIa(this.origBoard, this.xChar);
                        this.hardIa(board,this.xChar);
                    }else{
                        //this.easyIA();
                        this.easyIA(board);
                    }
                break;
            
                case "hard":
                    //this.hardIa(this.origBoard,this.xChar);
                    this.hardIa(board,this.xChar);
                break;

                
            }
            //JUGAR Y REVISAR SI GANO O PERDIO DE UNA VEZ!
            this.setIaTinking(false);
            console.log(board);
            console.log("IA SERVICE PIENSA: " + this.isIaTinking());
        }, this.getDelay());
        
    }

    easyIA(origBoard){
        let aviableSpots = this.emptyIndexies(origBoard);
        let randIndex = aviableSpots[Math.floor(Math.random())*aviableSpots.length];
        console.log(randIndex);                            
        //la IA pone su ficha en el lugar escogido anteriormente
        origBoard[randIndex] = this.xChar;
    }

    hardIa(board, payer){
        let iaIndex = this.minimax(board, payer).index;
        console.log("indice escogido por IA: " + iaIndex);                               
        board[iaIndex] = payer;
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

    minimax(reboard, player) {
        //por ahora
        let huPlayer = this.xChar;
        let aiPlayer = this.oChar;
        //
        //this.iter++;
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

    emptyIndexies(board){
        return  board.filter(s => s != "O" && s != "X");
    }

    public setIaTinking(think:boolean){
        this.isIAthinking = think;
    }

    public isIaTinking(){
        return this.isIAthinking;
    }
}