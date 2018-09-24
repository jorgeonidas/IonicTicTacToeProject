import { Component, Injectable } from '@angular/core';
import { TokenService } from '../../services/tokenService';
import { AuthService } from '../../services/authService';
import { Events, LoadingController } from 'ionic-angular';

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

  constructor(private tokenServ : TokenService, private aut: AuthService, private events: Events,
    public loadingCtrl: LoadingController) {
    console.log('Hello UserAccountComponent Component');
    this.profileImgUlr = 'assets/imgs/user.png'//Obviamente esto cargara luego de un servicio
    this.coins = this.aut.getCoins();
    this.eolas = this.aut.getEolas();

    this.coinIconUrl = "assets/imgs/coins.png";
    this.eolaIconUrl = "assets/imgs/eolas.png";

    this.lastNickName = this.nickName = this.aut.getCurrentUserNickname();

    this.userNameInputDisable = true;

    this.currTokenUrl = tokenServ.getCurrentSelectionUrl();

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
        this.aut.updateNickName(this.nickName).subscribe(()=>{
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
    this.aut.logOut();
    this.events.publish('updateNick : done');
  }

}
