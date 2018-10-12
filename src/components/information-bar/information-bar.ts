import { Component } from '@angular/core';
import { Platform, NavController, Events } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { AuthService } from '../../services/authService';
import * as Constants from '../../services/Constants'
@Component({
  selector: 'information-bar',
  templateUrl: 'information-bar.html'
})
export class InformationBarComponent {

  nickname: string;
  coins: number;
  eolas: number;

  coinIconUrl = Constants.COIN_URI;
  eolaIconUrl = Constants.EOLA_URI;
  deviceHeight : number;
  iphonex: boolean;
  isIos: boolean;
  model: string;
  activePage :string;

  private defaultNickName = 'human';

  constructor( platform: Platform, private device: Device, public navCtrl:NavController, public auth: AuthService, private events: Events) {
    console.log('Hello InformationBarComponent Component');
    
    //las monedas tambien tienen que cargar de un servicio
    this.loadCoins();
    
    platform.ready().then((readySrc) => {
      console.log('Width: ' + platform.width());
      console.log('Height: ' + platform.height());

      this.deviceHeight = platform.height();
      console.log("device",this.deviceHeight);
    })
    console.log(platform.height());
    this.model = this.device.model;
    console.log("device", this.model);
    
    this.deviceHeight = platform.height();

    this.iphonex = this.isIphoneX(platform.height(), platform.width(),platform.is('ios'));
    this.isIos = platform.is('ios');
    //this.iphonex = this.deviceHeight > 800;
    console.log("iphonex", this.iphonex);

    //chequear evento logout
    this.events.subscribe(('updateNick : done'),() => {
      console.log("Event catched by Information Bar Component");
      this.loadNickName();
      this.loadCoins();
    } );

    this.loadNickName();
  }
  ionViewDidLoad(){
    this.activePage = this.getActivePage();
    //console.log(this.getActivePage());
  }

  isIphoneX(h : number, w: number,p: boolean): boolean{
    let isX = false;
    if(h == 812 && w == 375 && p == true){
      isX = true;
    }

    return isX;
  }

  getActivePage(): string {
    return this.navCtrl.getActive().name;
    
  }

  loadNickName(){
    
    if (this.auth.getCurrentToken() != null) {
      this.nickname = this.auth.getCurrentUserNickname()
    } else {
      this.nickname = this.defaultNickName;
    }
  }

  loadCoins(){
    this.coins = this.auth.getCoins();
    this.eolas = this.auth.getEolas();
  }

}
