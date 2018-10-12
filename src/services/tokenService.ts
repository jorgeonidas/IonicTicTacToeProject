import * as Constants from '../services/Constants';
export class TokenService{
    tokensUrls: string[];
    currentSelection: number;

    constructor(){
        this.tokensUrls = Constants.TOKENS_URIS;
       
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