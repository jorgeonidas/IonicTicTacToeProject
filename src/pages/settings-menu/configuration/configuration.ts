import { Component, OnInit } from "@angular/core";
import { ViewController, PopoverController, Toggle, App } from "ionic-angular";
import { SettingsMenuPage } from "../settings-menu";
import { ConfigurationServiceDB } from "../../../services/configurationdb.service";
import { ConfigurationModel } from "../../../models/configuration";
import 'rxjs/Rx';
import { MainMenuPage } from "../../main-menu/main-menu";
import { Events } from 'ionic-angular';
@Component({
    template: `<ion-content style="width: 100%;  height: 100%;"  class="no-scroll">
                <ion-grid style="width: 100%;  height: 100%;" no-padding>
                    <ion-row style="height: 14%;">
                        <ion-col style="height: 100%;" text-center>
                            <h2 no-margin class="side-menu-title">Settings</h2>
                        </ion-col>                        
                    </ion-row>                   
                    <form #cfg="ngForm">
                        <ion-row style="height: 14%;">
                            <ion-col style="height: 100%;" text-center>
                                <div class="menuSubtitle">
                                    <h1 no-margin>Audio</h1>
                                </div>
                            </ion-col>
                        </ion-row>
                        <ion-row style="height: 14%;">
                            <ion-col style="height: 100%;"></ion-col>
                            <ion-col style="height: 100%;" text-center col-5>
                                <h2 no-margin>Music</h2>
                                <div class="toggleWrapper">
                                    <ion-toggle [(ngModel)]="music" name="music" (ionChange)="onToggle($event,'music')" color="secondary"></ion-toggle>
                                </div>
                            </ion-col>
                            <ion-col style="height: 100%;" text-center col-5>
                                <h2 no-margin>FX</h2>
                                <div class="toggleWrapper">
                                    <ion-toggle [(ngModel)]="sfx" name="sfx" (ionChange)="onToggle($event,'sfx')" color="secondary"></ion-toggle>
                                </div>
                            </ion-col>
                            <ion-col style="height: 100%;"></ion-col>
                        </ion-row>
                    </form>
                    <ion-row style="height: 14%;">
                        <ion-col style="height: 100%;">
                        </ion-col>

                        <ion-col style="height: 100%;" col-8>
                            <button  ion-button color="danger" block round (click)="leaveGame()">Leave Game</button>
                        </ion-col>
                        
                        <ion-col style="height: 100%;">
                        </ion-col>
                    </ion-row>
                    <ion-row style="height: 14%;">
                        <ion-col style="height: 100%;">
                        </ion-col>

                        <ion-col style="height: 100%;" col-6>
                            <button  ion-button color="gold" block round (click)="closeMenu()">Close</button>
                        </ion-col>
                        
                        <ion-col style="height: 100%;">
                        </ion-col>
                    </ion-row>        
                </ion-grid>
            </ion-content>`,
            styles: [`
                    .no-scroll{
                        overflow: hidden;
                        border: 10px solid #D4AF37;
                        border-radius: 15px;
                        margin: 0;
                    }

                    ion-row{
                        padding-top: 2%;
                        padding-bottom: 2%;
                    }

                    .menuSubtitle h1{
                        color: #d3d3d3;
                    }
                    
                    .toggleWrapper{
                        display: block;
                        width: 100%;  
                    }

                    ion-toggle{
                        margin: auto;
                    }

                    `]
})

export class ConfigurationPage implements OnInit{

    languages = ['English','Spanish'];
    currentLang: string = 'Spanish';
    music: boolean;
    sfx: boolean;
    notifications: boolean;

    //cfgmodel: ConfigurationModel;

    //configForm: FormGroup;

    public configObj: ConfigurationModel;
    errorMsj: string;
    constructor(private viewCtrl: ViewController, 
        private popoverCtrl: PopoverController, 
        private cfgService: ConfigurationServiceDB, 
        private appCtrl: App,
        private cfgModel: ConfigurationModel, private events: Events ){       

    }



    ngOnInit(){
        //actualizamos desde modelo para evitar animaciones asincronicas
        this.sfx = this.cfgModel.sfx;
        this.music = this.cfgModel.music;
        this.notifications = this.cfgModel.notifications;
        this.currentLang = this.cfgModel.language;

        /*
        console.log('ngOnInit: ');
        //this.cfgService.clear();
        this.cfgService.get('sfx').then((val) => {
            console.log(val);
            this.sfx = val;
            //this.cfgmodel.setSfx(val);
        });

        this.cfgService.get('music').then((val) => {
            console.log(val);
            this.music = val;
        });

        this.cfgService.get('currentLang').then((val) => {
            console.log(val);
            this.currentLang = val;
        });

        this.cfgService.get('notifications').then((val) => {
            console.log(val);
            this.notifications = val;
        });
        
        //this.sfx = this.cfgmodel.sfx;*/
    }
    //actualizo tanto bd como modelo
    onToggle(toggle: Toggle, option: string){
        console.log(toggle.value);
        console.log(option);
        switch(option){
            case 'music':
                this.music = toggle.value;
                this.cfgModel.music = this.music;
                break;
            case 'sfx':
                this.sfx = toggle.value;
                this.cfgModel.sfx = this.sfx;
                break;
            case 'notifications':
                this.notifications = toggle.value;
                this.cfgModel.notifications = this.notifications; 
                break;
        }

        this.cfgService.set(option,toggle.value);
    }

    onSelectChange(selectedValue: any) {
        console.log(selectedValue);    
        this.currentLang = selectedValue;
        this.cfgService.set('currentLang',selectedValue);
    }

        
    onClickBack(){
        const popover = this.popoverCtrl.create(SettingsMenuPage);
        popover.present();
        this.viewCtrl.dismiss();
        this.events.publish('settings:changed');//app atrapara este evento
    }

    closeMenu(){
        this.viewCtrl.dismiss(true/*el juego continua*/);
        this.events.publish('settings:changed');//app atrapara este evento
    }

    leaveGame(){
        console.log("leave game event");
        this.events.publish('settings:changed');//app atrapara este evento
        this.cfgService.setLeavingCurrentGame(true); //el servicio guardara si abandono el juego
        this.viewCtrl.dismiss(false/*el juego NO continua*/);
        //this.appCtrl.getRootNav().popTo(this.appCtrl.getRootNav().getByIndex(this.appCtrl.getRootNav().length()-4),{animate:false}); //hago pop 3 niveles
        //this.appCtrl.getRootNav().pop({animate:false});
    }
}