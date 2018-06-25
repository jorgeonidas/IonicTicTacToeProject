export class PlayerSelectorService{

    portraitUris: string[];
    public pOnePick: boolean[] = Array(8);
    public pTwoOrBotPick: boolean[] =  Array(8);
    constructor(){
        this.portraitUris = 
        [
          'assets/imgs/enojado.png',
          'assets/imgs/cansado.png',
          'assets/imgs/enamorado.png',
          'assets/imgs/escondido.png',
          'assets/imgs/like.png',
          'assets/imgs/upps.png',
          'assets/imgs/sorprendido.png',
          'assets/imgs/lol.png',
        ];

        for (let index = 0; index < this.pOnePick.length; index++) {
            this.pOnePick[index] = false;
            this.pTwoOrBotPick[index] = false;
        }
        console.log(this.pOnePick, this.pTwoOrBotPick);
        

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

}