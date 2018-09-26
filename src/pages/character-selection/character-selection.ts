import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Platform } from 'ionic-angular';
import { GamePage } from '../game/game';
import { PreGamePage } from '../pre-game/pre-game';
import { PlayerSelectorService } from '../../services/playerSelService';
import { AdmobServiceProvider } from '../../providers/admob-service/admob-service';

@IonicPage()
@Component({
  selector: 'page-character-selection',
  templateUrl: 'character-selection.html',
})
export class CharacterSelectionPage {
  //gameType: string='singleplayer';
  gameType: string='local-multiplayer';
  rounds: number = 1;
  difficulty: string = 'easy';
  isSinglePlayer: boolean;

  gamePage = GamePage;
  preGamePage = PreGamePage;
  
  //retratos
  playerOnePortrait: string;
  playerTwoOrBotPortrait: string;
  isOverOne: boolean;
  isOverTwo: boolean;
  portraitsUrls : string[];
  //dragulaModel
  portraitOne = new Array(1);
  portraitTwo = new Array(1);

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private playerSelService: PlayerSelectorService,
    private admob:AdmobServiceProvider,
    //private events : Events,
    private platform: Platform) {

      //preparando ad
    this.platform.ready().then(()=>{
      //prepara y muestra add
      this.admob.prepareInterstitialAd();
  
    });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CharacterSelectionPage');
    this.gameType = this.navParams.get('selection'); //mientras testeo
    
    console.log("gametype: "+this.gameType); 
    this.isOverOne = false;
    this.isOverTwo = false;
     
  }

  onRoundSelection(nr: number){
    this.rounds = nr;
    console.log(this.rounds);
    
  }

  onDifficultySelection(difficulty: string){
    this.difficulty = difficulty;
    console.log(this.difficulty);
   
  }

  onClickPlay(){
    let currentIndex = this.navCtrl.getActive().index;
    this.navCtrl.push(this.preGamePage,
      {gameType: this.gameType, 
      rounds: this.rounds, 
      difficulty: this.difficulty,
      playerOnePortrait: this.playerOnePortrait,
      playerTwoOrBotPortrait: this.playerTwoOrBotPortrait}, 
      {animate: false}
    ).then(()=>{
      this.navCtrl.remove(currentIndex); //remuevo esta pagina del stack
    });
  }

  onClickBack(){
    this.playerSelService.resetPicks();
    if(this.admob.cordovaAviable){
      //si la publicidad no falla en cargar
      if(!this.admob.failToLoadInterstitial){
        this.admob.showInterstitialAd().onAdDismiss().subscribe(()=>{
          this.navCtrl.pop({animate:false});
        }, e =>{
          console.log(e);
          this.navCtrl.pop({animate:false});
          
        });
      }else{
        this.navCtrl.pop({animate:false});
      }
    }else{
      this.navCtrl.pop({animate:false});
    }
  }

  //eventos 
  updatePlayerOnePortrati(asset : string){
    console.log(asset);
    this.portraitOne[0] = asset;
    this.playerOnePortrait = asset;
    console.log("portrait one " + this.portraitOne[0]);
    
    
  }

  updatePlayerTwoOrBotProtrait(asset : string){
    console.log(asset);
    this.portraitTwo[0]= asset;
    this.playerTwoOrBotPortrait = asset;
    console.log("portrait two " + this.portraitTwo[0]);
    
  }

  setOverOnePortrait(value : boolean){
    this.isOverOne = value;
    console.log(this.isOverOne);
    
  }

  setOverTwoPortrait(value: boolean){
    this.isOverTwo = value;
    console.log(this.isOverTwo);
  }

  randPortraitSelectOne(){
    let uri = this.playerSelService.randomPortraitPick();
    this.updatePlayerOnePortrati(uri);
    let index = this.playerSelService.getPortraitIndex(uri);
    this.playerSelService.setPickPone(index);
  }

  randPortraitSelectTwo(){
    let uri = this.playerSelService.randomPortraitPick();
    this.updatePlayerTwoOrBotProtrait(uri);
    let index = this.playerSelService.getPortraitIndex(uri);
    this.playerSelService.setPickTwoOrBot(index);
  }
}
