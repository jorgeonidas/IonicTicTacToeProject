import { Component, Injectable } from '@angular/core';
import { TokenService } from '../../services/tokenService';
@Component({
  selector: 'token-selector',
  templateUrl: 'token-selector.html'
})
@Injectable()
export class TokenSelectorComponent {

  tokensUrls: string[];
  currentInspectIndex: number;
  currentSelection: number;

  constructor(private tokenService: TokenService) {
    console.log('Hello TokenSelectorComponent Component');
    this.tokensUrls = tokenService.getTokens();
    this.currentSelection = this.tokenService.getCurrentSelectionIndex();
    console.log("last selection ", this.currentSelection);
    
  }

  inspect(index: number){
    console.log("token index: " + index);
    this.currentInspectIndex = index;
  }

  onSelectTokens(){
    this.currentSelection = this.currentInspectIndex;
    this.tokenService.setCurrentSelection(this.currentSelection);
    console.log("token selected: ", this.tokenService.getCurrentSelectionIndex());
    
  }

}
