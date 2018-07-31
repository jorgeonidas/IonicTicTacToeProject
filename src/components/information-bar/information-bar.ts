import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { Device } from '@ionic-native/device';

@Component({
  selector: 'information-bar',
  templateUrl: 'information-bar.html'
})
export class InformationBarComponent {

  nickname: string;
  coins: number;
  eolas: number;

  coinIconUrl = "assets/imgs/coins.png";
  eolaIconUrl = "assets/imgs/eolas.png";
  deviceHeight : number;
  iphonex: boolean;
  isIos: boolean;
  model: string;
  activePage :string;

  constructor( platform: Platform, private device: Device, public navCtrl:NavController) {
    console.log('Hello InformationBarComponent Component');
    this.nickname = 'human';
    this.coins = 9999;
    this.eolas = 9999;
    
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
    console.log(this.getActivePage());
    this.activePage = this.getActivePage();
    
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

}
