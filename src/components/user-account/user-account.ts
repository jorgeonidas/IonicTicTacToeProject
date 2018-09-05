import { Component, Injectable } from '@angular/core';
import { TokenService } from '../../services/tokenService';
import { AuthService } from '../../services/authService';

@Component({
  selector: 'user-account',
  templateUrl: 'user-account.html'
})
@Injectable()
export class UserAccountComponent {

  profileImgUlr: string;
  nickName: string;
  coins: number;
  eolas: number;

  coinIconUrl : string; 
  eolaIconUrl: string;
  
  userNameInputDisable: boolean;

  currTokenUrl: string;
  rankingUri: string = 'assets/imgs/medal-icon.png';

  constructor(private tokenServ : TokenService, private aut: AuthService) {
    console.log('Hello UserAccountComponent Component');
    this.profileImgUlr = 'assets/imgs/user.png'//Obviamente esto cargara luego de un servicio
    this.coins = 9999;
    this.eolas = 9999;

    this.coinIconUrl = "assets/imgs/coins.png";
    this.eolaIconUrl = "assets/imgs/eolas.png";

    this.nickName = this.aut.getCurrentUserNickname();

    this.userNameInputDisable = true;

    this.currTokenUrl = tokenServ.getCurrentSelectionUrl();

  }

  toggleEdit(){
    this.userNameInputDisable = !this.userNameInputDisable;
  }

}
