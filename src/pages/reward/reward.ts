import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  restaraunts = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
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
  //hardSpinnerUri: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.coinIconUrl = "assets/imgs/coins.png";
    //this.hardSpinnerUri = "assets/imgs/RuletaBG.png"
    
  }

  ionViewDidLoad() {
    this._CANVAS = this.ctx.nativeElement;
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
      this.startAngles[i] = this.startAngles[i] + spinAngle;
      //console.log(startAngles[i]);
      
    }
  
   // startAngle += (spinAngle * Math.PI / 180);
   this.drawRouletteWheel();
    //this.spinTimeout = setTimeout('rotateWheel()', 30);
    this.spinTimeout = setTimeout(() => {this.rotateWheel();}, 30);
  }

  easeOut(t, b, c, d) {
    var ts = (t/=d)*t;
    var tc = ts*t;
    return b+c*(tc + -3*ts + 3*t);
  }

  stopRotateWheel() {
    clearTimeout(this.spinTimeout);
    //var degrees = startAngle * 180 / Math.PI + 90;
    var degrees = this.startAngles[0] * 180 / Math.PI + 90;
    console.log("grados", degrees); 
   /* var arcd = arco * 180 / Math.PI;//lo esta haciendo en base a que todas las secciones son de 30°
    console.log("arcd",arcd);*/
    //console.log(Math.floor(360 - degrees % 360));//base de 360°
    //grado en que cayo
    let iDeg = Math.floor(360 - degrees % 360);
    console.log("grados base 360",iDeg);
    var index = this.getIndex(iDeg);
  
    //var index = Math.floor((360 - degrees % 360) / arcd);
    console.log("index", index);
    
    this._CONTEXT.save();
    this._CONTEXT.font = 'bold 30px Helvetica, Arial';
  
    this._CONTEXT.restore();
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

  drawRouletteWheel() {
    //var canvas = document.getElementById("canvas");

      let outsideRadius = 200;
      let textRadius = 160;
      var insideRadius = 0;

      //ctx = canvas.getContext("2d");
      this._CONTEXT.clearRect(0, 0, 500, 500);


      this._CONTEXT.strokeStyle = "black";
      this._CONTEXT.lineWidth = 2;

      this._CONTEXT.font = 'bold 12px Helvetica, Arial';

      for (var i = 0; i < this.cantPremios; i++) {

        let angle = this.startAngles[i];
        this._CONTEXT.fillStyle = this.colors[i];

        this._CONTEXT.beginPath();
        this._CONTEXT.arc(250, 250, outsideRadius, angle, angle + this.arc[i], false);
        this._CONTEXT.arc(250, 250, insideRadius, angle + this.arc[i], angle, true);
        this._CONTEXT.stroke();
        this._CONTEXT.fill();

        this._CONTEXT.save();
        this._CONTEXT.shadowOffsetX = -1;
        this._CONTEXT.shadowOffsetY = -1;
        this._CONTEXT.shadowBlur = 0;
        this._CONTEXT.shadowColor = "rgb(220,220,220)";
        this._CONTEXT.fillStyle = "black";
        this._CONTEXT.translate(
          250 + Math.cos(angle + this.arc[i] / 2) * textRadius,
          250 + Math.sin(angle + this.arc[i] / 2) * textRadius
        );
        this._CONTEXT.rotate(angle + this.arc[i] / 2 + Math.PI / 2);
        let text = this.restaraunts[i];
        this._CONTEXT.fillText(text, -this._CONTEXT.measureText(text).width / 2, 0);
        this._CONTEXT.restore();
        //startAngle = angle;

      }

      //Arrow
      this._CONTEXT.fillStyle = "black";
      this._CONTEXT.beginPath();
      this._CONTEXT.moveTo(250 - 4, 250 - (outsideRadius + 5));
      this._CONTEXT.lineTo(250 + 4, 250 - (outsideRadius + 5));
      this._CONTEXT.lineTo(250 + 4, 250 - (outsideRadius - 5));
      this._CONTEXT.lineTo(250 + 9, 250 - (outsideRadius - 5));
      this._CONTEXT.lineTo(250 + 0, 250 - (outsideRadius - 13));
      this._CONTEXT.lineTo(250 - 9, 250 - (outsideRadius - 5));
      this._CONTEXT.lineTo(250 - 4, 250 - (outsideRadius - 5));
      this._CONTEXT.lineTo(250 - 4, 250 - (outsideRadius + 5));
      this._CONTEXT.fill();
  }

}
