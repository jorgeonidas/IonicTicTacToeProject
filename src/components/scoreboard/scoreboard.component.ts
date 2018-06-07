import { Component, Input } from "@angular/core";


@Component({
    selector:'scoreboard',
    templateUrl: 'scoreboard.html',
    styles: [`
        #barContainer{
            width: 100%; 
            height: 75%;
        }

        #heathlBar{
            height:100%;
            min-width: 5%;
            padding: 5px;   
        }
        
        .playerOneColor{
            background-color: #05ada5;
        }

        .playerTwoOrBotColor{
            background-color: #f331e0;
        }

        .nameContainer{
            background-color: gray;
            width: 100%;
            color: #fff;
        }

        .scoreCol{
            border-style: solid;
            border-width: 2px;
            border-radius: 12px;
            border-color: #D4AF37;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #0de5da;
            font-size: 22px;
            font-weight: bold;
        }
    `] 
})

export class ScoreboardComponent{
    @Input() playerOneScore: number = 0;
    @Input() playerTwoOrBotScore: number = 0;
    @Input() playerOneTurn: boolean = true;
    @Input() playerOneHealth: number = 100;
    @Input() playerTwoOrBotHealth: number = 100;
}