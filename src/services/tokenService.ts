export class TokenService{
    tokensUrls: string[];
    currentSelection: number;

    constructor(){
        this.tokensUrls = 
        [
          'assets/imgs/Tic-Tac-Toe-icon-mockup.ico',
          'assets/imgs/tic_tac_toe-mockup-red.png',
          'assets/imgs/tic-tac-toep-mouckup-3.png',
          'assets/imgs/tic-tac-toe-mockup-4.png',
          'assets/imgs/tic-tac-toe-mockyp-5.png',
          'assets/imgs/Tic-Tac-Toe-icon-mockup.ico',
          'assets/imgs/Tic-Tac-Toe-icon-mockup.ico',
          'assets/imgs/Tic-Tac-Toe-icon-mockup.ico',
          'assets/imgs/Tic-Tac-Toe-icon-mockup.ico'
        ];

        this.setCurrentSelection(0);
    }

    getTokens(): string[]{
        return  this.tokensUrls;
    }

    setCurrentSelection(index){
        this.currentSelection = index;
    }

    getCurrentSelectionIndex(): number{
        return this.currentSelection;
    }

    getCurrentSelectionUrl() : string{
        return this.tokensUrls[this.currentSelection];
    }
}