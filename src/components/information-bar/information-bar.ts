import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
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

  constructor( platform: Platform) {
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
    
    this.deviceHeight = platform.height();

    this.iphonex = this.deviceHeight > 800;
    console.log("device",this.deviceHeight, this.iphonex);
    
  }

}
