import { Component } from "@angular/core";

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

export class GameBoardComponent{
    origBoard: string[] = ["0","1","2","3","4","5","6","7","8"];
    playerOne: boolean = true;
    xChar: string = 'X';
    oChar: string = 'O';

    onCellClickled(index: number){
        console.log(index + "cell clicked");
        if(this.playerOne){
            this.origBoard[index] = this.xChar;
        }else{
            this.origBoard[index] = this.oChar;
        }
        this.playerOne = !this.playerOne;
        console.log(this.origBoard);
    }
}