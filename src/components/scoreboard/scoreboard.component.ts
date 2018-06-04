import { Component } from "@angular/core";


@Component({
    selector:'scoreboard',
    template: '<ion-toolbar no-border text-center> {{playerOneScore}} - {{playerTwoOrBotScore}} </ion-toolbar>',
    styles: [``] 
})

export class ScoreboardComponent{
    playerOneScore: number = 0;
    playerTwoOrBotScore: number = 0;
}