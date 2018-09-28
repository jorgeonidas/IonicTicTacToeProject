import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { WithdraRewardPage } from '../withdra-reward/withdra-reward';
import { AuthService } from '../../services/authService';
import { AdmobServiceProvider } from '../../providers/admob-service/admob-service';

@IonicPage()
@Component({
  selector: 'page-reward',
  templateUrl: 'reward.html',
})
export class RewardPage {

  /**
  * 'plug into' DOM canvas element using @ViewChild
  */
  @ViewChild('canvas') ctx: ElementRef;

  /**
  * Reference Canvas object
  */
  private _CANVAS: any;

  /**
  * Reference the context for the Canvas element
  */
  private _CONTEXT: any;

  //roulette elements
  colors = ["#B8D430", "#3AB745", "#029990", "#3501CB",
    "#2E2C75", "#673A7E", "#CC0071", "#F80120",
    "#F35B20", "#FB9A00", "#FFCC00", "#FEF200"];

  pricesIndex = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  prices = [
    "5 Eolas", "5 Crystals", "10 Crystals", "5 Crystals", "1 Eola",
    "5 Crystals", "20 Crystals", "5 Crystals", "1 Eola", "5 Crystals"
  ];
  orgStartAngles = [0, 10, 56, 96, 142, 167, 213, 243, 289, 314];

  arc = [
    this.gradosARadianes(10), this.gradosARadianes(46),
    this.gradosARadianes(40), this.gradosARadianes(46),
    this.gradosARadianes(25), this.gradosARadianes(46),
    this.gradosARadianes(30), this.gradosARadianes(46),
    this.gradosARadianes(25), this.gradosARadianes(46)
  ];

  startAngles = [
    0,
    this.gradosARadianes(10),
    this.gradosARadianes(56),
    this.gradosARadianes(96),
    this.gradosARadianes(142),
    this.gradosARadianes(167),
    this.gradosARadianes(213),
    this.gradosARadianes(243),
    this.gradosARadianes(289),
    this.gradosARadianes(314)
  ];

  cantPremios = 10;
  //variables aleatorias
  spinAngleStart : number = 0;
  spinTime : number = 0;
  spinTimeTotal : number = 0;
  spinTimeout : any;

  //startAngle: number = 0;
  coinIconUrl: string;
  coinAmmount: number;
  //hardSpinnerUri: string;
  deviceWidth : number;
  //la ruleta solo puede girar una vez
  isSpining : boolean;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public platform: Platform,
    private auth : AuthService,
    private admob : AdmobServiceProvider) {
    this.coinIconUrl = "assets/imgs/coins.png";
    //this.hardSpinnerUri = "assets/imgs/RuletaBG.png"
    this.coinAmmount = this.auth.getCoins();
    console.log("coin ammount", this.coinAmmount);
    
    this.admob.isEnergyClaimPage = false; //para avisar que no lance el evento
    this.platform.ready().then(()=>{
      /*prepara los ads para que ya esten cargados 
      al pasar a la siguente pagina o al menos avise que fallo*/   
      this.admob.prepareVideoAdd();
      this.admob.prepareInterstitialAd();
    });

  }

  ionViewDidLoad() {
    this.isSpining = false;
    this.deviceWidth = this.platform.width();
    console.log(this.deviceWidth);
    this._CANVAS = this.ctx.nativeElement;
    //elimina efecto pixelado del canvas al ajustarse a una pantalla
    let s = getComputedStyle(this._CANVAS);
    let w = s.width;
    let h = s.height;
    this._CANVAS.width = w.split('px')[0];
    this._CANVAS.height = h.split('px')[0];
    this.initialiseCanvas();
    this.drawRouletteWheel();
  }

  initialiseCanvas(): void {
    if (this._CANVAS.getContext) {
      this.setupCanvas();
    }
  }

  setupCanvas(): void {
    this._CONTEXT = this._CANVAS.getContext('2d');
  }

  gradosARadianes(grados){
    return ((grados*Math.PI)/180);
  }
  
  //private weights = [0.02, 0.13, 0.11, 0.13, 0.07, 0.13, 0.08, 0.13, 0.07, 0.13]; // probabilidades
  //private results = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; //valores a retornar
  
  spin(){
    this.isSpining = true;
    //let index = this.generateIndex();
    //console.log(index);
    this.spinAngleStart = Math.random() * 10 + 10;
    this.spinTime = 0;
    this.spinTimeTotal = Math.random() * 3 + 4 * 1000;
    this.rotateWheel(); 
  }

  rotateWheel() {
    this.spinTime += 30;
    if(this.spinTime >= this.spinTimeTotal) {
      this.stopRotateWheel();
      return;
    }
    
    var spinAngle = this.spinAngleStart - this.easeOut(this.spinTime, 0, this.spinAngleStart, this.spinTimeTotal);
    
    for (var i = 0; i < this.cantPremios; i++){
      this.startAngles[i] = this.startAngles[i] + this.gradosARadianes(spinAngle);  
    }
  

   this.drawRouletteWheel();
    this.spinTimeout = setTimeout(() => {this.rotateWheel();}, 30);
  }

  easeOut(t, b, c, d) {
    var ts = (t/=d)*t;
    var tc = ts*t;
    return b+c*(tc + -3*ts + 3*t);
  }

  stopRotateWheel() {
    clearTimeout(this.spinTimeout);

    var degrees = this.startAngles[0] * 180 / Math.PI + 90;
    console.log("grados", degrees); 

    //grado en que cayo
    let iDeg = Math.floor(360 - degrees % 360);
    console.log("grados base 360",iDeg);
    var index = this.getIndex(iDeg);

    console.log("index", index);
    
    this._CONTEXT.save();
    this._CONTEXT.font = 'bold 30px Helvetica, Arial';
  
    this._CONTEXT.restore();

    console.log("congratulations you win: ",this.prices[index]);
    
    this.toWithDrawRewardPage(this.prices[index]);
    /*
    let timeoutToWithdraw = setTimeout(() => {
      this.navCtrl.push(WithdraRewardPage,
        {reward : this.prices[index]},
        {animate: false}
      );
    }, 2000);*/
    
  }

  toWithDrawRewardPage(price: string){
    let timeoutToWithdraw = setTimeout(() => {
      let currentIndex = this.navCtrl.getActive().index;
      this.navCtrl.push(WithdraRewardPage,
        {reward :price },
        {animate: false}
      ).then(()=>{
        this.navCtrl.remove(currentIndex); //remuevo esta pagina del stack
      });
    }, 2000);
  }

  getIndex(d){
    console.log("grados a evaluar",d);
    
    var index = 0;
  
    while (index != this.orgStartAngles.length - 1) {
      if(d >= this.orgStartAngles[index]  && d < this.orgStartAngles[index+1] ){
        return index;
      }
      index ++;
    }
  
    return index;
  
  }

  drawRouletteWheel() {

      //devicewidth para saber sacar diferencia con el radio externo
      let arrowScaler = 1;
      let difference = 25;
      if(this.deviceWidth >= 768){
        difference = 45;
        arrowScaler = 2;
      }
      if (this.deviceWidth >= 1024){
        difference = 80;
        arrowScaler = 4;
      }
      //console.log(difference);
      
      let outsideRadius = this._CANVAS.width/3; //radio externo
      let textRadius = outsideRadius-difference;  //radio del texto
      var insideRadius = 0;

      this._CONTEXT.clearRect(0, 0, this._CANVAS.width, this._CANVAS.height); //limpia el canvas

      this._CONTEXT.strokeStyle = "black";
      this._CONTEXT.lineWidth = 2;

      this._CONTEXT.font = 'bold 4vw Helvetica, Arial';
      //punto de origen del circulo
      let originX = this._CANVAS.width/2;
      let originY = this._CANVAS.height/2;
      //console.log(originX,originY);
      
      for (var i = 0; i < this.cantPremios; i++) {

        let angle = this.startAngles[i];
        this._CONTEXT.fillStyle = this.colors[i];

        this._CONTEXT.beginPath();
        this._CONTEXT.arc(originX, originY, outsideRadius, angle, angle + this.arc[i], false);
        this._CONTEXT.arc(originX, originY, insideRadius, angle + this.arc[i], angle, true);
        this._CONTEXT.stroke();
        this._CONTEXT.fill();

        this._CONTEXT.save();
        this._CONTEXT.shadowOffsetX = -1;
        this._CONTEXT.shadowOffsetY = -1;
        this._CONTEXT.shadowBlur = 0;
        this._CONTEXT.shadowColor = "rgb(220,220,220)";
        this._CONTEXT.fillStyle = "black";
        this._CONTEXT.translate(
          originX + Math.cos(angle + this.arc[i] / 2) * textRadius,
          originY + Math.sin(angle + this.arc[i] / 2) * textRadius
        );
        this._CONTEXT.rotate(angle + this.arc[i] / 2 + Math.PI / 2);
        let text = this.pricesIndex[i];
        this._CONTEXT.fillText(text, -this._CONTEXT.measureText(text).width / 2, 0);
        this._CONTEXT.restore();

      }

      this._CONTEXT.fillStyle = "black";
      this._CONTEXT.beginPath();
      this._CONTEXT.moveTo(originX - 4*arrowScaler, originY - (outsideRadius + 5*arrowScaler));
      this._CONTEXT.lineTo(originX + 4*arrowScaler, originY - (outsideRadius + 5*arrowScaler));
      this._CONTEXT.lineTo(originX + 4*arrowScaler, originY - (outsideRadius - 5*arrowScaler));
      this._CONTEXT.lineTo(originX + 9*arrowScaler, originY - (outsideRadius - 5*arrowScaler));
      this._CONTEXT.lineTo(originX + 0, originY - (outsideRadius - 13*arrowScaler));
      this._CONTEXT.lineTo(originX - 9*arrowScaler, originY - (outsideRadius - 5*arrowScaler));
      this._CONTEXT.lineTo(originX - 4*arrowScaler, originY - (outsideRadius - 5*arrowScaler));
      this._CONTEXT.lineTo(originX - 4*arrowScaler, originY - (outsideRadius + 5*arrowScaler));
      this._CONTEXT.fill();

      
      //Arrow
      /*
      this._CONTEXT.fillStyle = "black";
      this._CONTEXT.beginPath();
      this._CONTEXT.moveTo(originX - 4, originY - (outsideRadius + 5));
      this._CONTEXT.lineTo(originX + 4, originY - (outsideRadius + 5));
      this._CONTEXT.lineTo(originX + 4, originY - (outsideRadius - 5));
      this._CONTEXT.lineTo(originX + 9, originY - (outsideRadius - 5));
      this._CONTEXT.lineTo(originX + 0, originY - (outsideRadius - 13));
      this._CONTEXT.lineTo(originX - 9, originY - (outsideRadius - 5));
      this._CONTEXT.lineTo(originX - 4, originY - (outsideRadius - 5));
      this._CONTEXT.lineTo(originX - 4, originY - (outsideRadius + 5));
      this._CONTEXT.fill();*/
  }

  /*
  generateIndex(){
    var num = Math.random(),
        s = 0,
        lastIndex = this.weights.length - 1;

    for (var i = 0; i < lastIndex; ++i) {
        s += this.weights[i];
        if (num < s) {
            return this.results[i];
        }
    }

    return this.results[lastIndex];
  }
  */


}
