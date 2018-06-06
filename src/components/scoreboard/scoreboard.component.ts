import { Component, Input } from "@angular/core";


@Component({
    selector:'scoreboard',
    template: '<ion-toolbar no-border text-center> {{playerOneScore}} - {{playerTwoOrBotScore}} </ion-toolbar>',
    styles: [``] 
})

export class ScoreboardComponent{
    @Input() playerOneScore: number = 0;
    @Input() playerTwoOrBotScore: number = 0;
}