import { Component, Injectable } from '@angular/core';
import { TokenService } from '../../services/tokenService';
import { AuthService } from '../../services/authService';
import { Events, LoadingController } from 'ionic-angular';
import * as Constants from '../../services/Constants';
import { OriginatorService } from '../../services/originatorService';
@Component({
  selector: 'user-account',
  templateUrl: 'user-account.html'
})
@Injectable()
export class UserAccountComponent {

  profileImgUlr: string;
  nickName: string;
  lastNickName: string;
  coins: number;
  eolas: number;

  coinIconUrl : string; 
  eolaIconUrl: string;
  
  userNameInputDisable: boolean;

  currTokenUrl: string;
  rankingUri: string = 'assets/imgs/medal-icon.png';

  constructor(private tokenServ : TokenService, private auth: AuthService, private events: Events,
    public loadingCtrl: LoadingController, public originator : OriginatorService) {
    console.log('Hello UserAccountComponent Component');
    this.profileImgUlr = 'assets/imgs/user.png'//Obviamente esto cargara luego de un servicio
    
    this.loadCoins();

    this.coinIconUrl = Constants.COIN_URI;
    this.eolaIconUrl = Constants.EOLA_URI;

    this.lastNickName = this.nickName = this.auth.getCurrentUserNickname();

    this.userNameInputDisable = true;

    this.currTokenUrl = tokenServ.getCurrentSelectionUrl();
      /*
    this.events.subscribe(('updateNick : done'),() => {
      console.log("Event catched by Information Bar UserAccont Component");
      this.loadNickName();
      this.loadCoins();
    } );*/

  }

  toggleEdit(){
    this.userNameInputDisable = !this.userNameInputDisable;
    console.log("toggle: ",this.userNameInputDisable);
    if(this.userNameInputDisable){
      console.log(this.nickName);
      if(this.nickName != this.lastNickName){
        const loading = this.loadingCtrl.create({ content: 'Please Wait...' });
        loading.present();
        console.log("cambio de nombre");
        //actualizo el nick tanto desde cliente como en el api
        this.auth.updateNickName(this.nickName).subscribe(()=>{
          loading.dismiss();
          this.events.publish('updateNick : done'); //avisar el cambio de nickname en la information bar
        },
          error =>{
            console.log(error);
            
          }
        );
      }
    }

  }

  logOut(){
    this.auth.logOut();
    this.events.publish('updateNick : done');
  }

  loadNickName(){
    
    if (this.auth.getCurrentToken() != null) {
      this.nickName = this.auth.getCurrentUserNickname()
    } else {
      this.nickName = this.lastNickName;
    }
  }

  loadCoins(){
    /*
    this.coins = this.auth.getCoins();
    this.eolas = this.auth.getEolas();
    */
    this.coins = this.originator.getCristals();
    this.eolas = this.originator.getEolas();
  }

}
