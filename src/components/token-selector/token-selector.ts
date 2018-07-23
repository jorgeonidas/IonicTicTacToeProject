import { Component, Injectable, Input } from '@angular/core';
import { TokenService } from '../../services/tokenService';
import { Platform } from 'ionic-angular';
@Component({
  selector: 'token-selector',
  templateUrl: 'token-selector.html'
})
@Injectable()
export class TokenSelectorComponent {

  tokensUrls: string[];
  curTokenUrlsPage: string[];
  currentInspectIndex: number;
  currentInspectedUrl: string;
  currentSelection: number;

  maxPerPage: number =9;
  maxPerPageIphoneX: number = 12;

  @Input() isStore: boolean = false;
  deviceHeight: number;
  iphonex: boolean;

  constructor(private tokenService: TokenService, platform: Platform) {

     //obtener altura del telefono
     this.deviceHeight = platform.height();
     this.iphonex = this.deviceHeight > 800;
     console.log("device",this.deviceHeight, this.iphonex);
     //maximo de paginacion dependiendo del la altura del dispositivo
     if(this.iphonex){
      this.curTokenUrlsPage = new Array(this.maxPerPageIphoneX);
      console.log(this.curTokenUrlsPage.length);
    }else{
      this.curTokenUrlsPage = new Array(this.maxPerPage);
      console.log(this.curTokenUrlsPage.length);
    }


    console.log('Hello TokenSelectorComponent Component');
    this.tokensUrls = tokenService.getTokens();
    this.currentSelection = this.tokenService.getCurrentSelectionIndex();
    this.currentInspectedUrl = this.tokenService.getCurrentSelectionUrl();
    console.log("last selection ", this.currentSelection);
    //PAGINAR DESPUES DESDE UN SERVICIO ESTO ES SOLO POR PROTOTIPADO
    for(let i = 0; i< this.curTokenUrlsPage.length; i++){
      this.curTokenUrlsPage[i] = tokenService.getTokens()[i];
    }
  }

  inspect(index: number){
    console.log("token index: " + index);
    this.currentInspectIndex = index;
    this.currentInspectedUrl = this.tokensUrls[this.currentInspectIndex]; //ojo Necesito hacer un paginador
  }

  onSelectTokens(){
    this.currentSelection = this.currentInspectIndex;
    this.tokenService.setCurrentSelection(this.currentSelection);
    console.log("token selected: ", this.tokenService.getCurrentSelectionIndex());
    
  }

}
