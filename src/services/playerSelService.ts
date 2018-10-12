import * as Constants from '../services/Constants';
export class PlayerSelectorService{

    portraitUris :string[]  = Constants.PORTRAIT_URIS;

    public pOnePick: boolean[];
    public pTwoOrBotPick: boolean[] ;

    isSinglePlayer: boolean;

    constructor(){
        this.pOnePick = new Array(this.portraitUris.length);
        this.pTwoOrBotPick = new Array(this.portraitUris.length);
    }

    public randomPortraitPick() : string{
       return this.portraitUris[Math.floor(Math.random()*this.portraitUris.length)]
    }

    public getPortraitIndex(uri: string): number{
        return this.portraitUris.indexOf(uri);
    }

    public setPickPone(pickedIndex: number){
        for (let index = 0; index < this.pOnePick.length; index++) {
            this.pOnePick[index] = false;      
        }

        this.pOnePick[pickedIndex] = true;
    }

    public setPickTwoOrBot(pickedIndex: number){
        for (let index = 0; index < this.pOnePick.length; index++) {
            this.pTwoOrBotPick[index] = false;      
        }

        this.pTwoOrBotPick[pickedIndex] = true;
    }

    public setSinglePlayer(value: boolean){
        this.isSinglePlayer = value;
    }

    public getIsSinglePlayer(){
        return this.isSinglePlayer;
    }

    public resetPicks(){
        for (let index = 0; index < this.pOnePick.length; index++) {
            this.pOnePick[index] = false;
            this.pTwoOrBotPick[index] = false;
        }
        console.log(this.pOnePick, this.pTwoOrBotPick);
    }

}