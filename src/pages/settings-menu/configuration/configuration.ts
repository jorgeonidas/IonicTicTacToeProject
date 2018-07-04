import { Component, OnInit } from "@angular/core";
import { ViewController, PopoverController, Toggle, App } from "ionic-angular";
import { SettingsMenuPage } from "../settings-menu";
import { ConfigurationServiceDB } from "../../../services/configurationdb.service";
import { ConfigurationModel } from "../../../models/configuration";
import 'rxjs/Rx';
import { MainMenuPage } from "../../main-menu/main-menu";
import { Events } from 'ionic-angular';
@Component({
    template: `<ion-grid text-center>
                    <ion-row>
                        <ion-col text-center>
                            <h2>Settings</h2>
                        </ion-col>                        
                    </ion-row>                   
                    <form #cfg="ngForm">
                        <ion-row>
                            <ion-col>
                                <h1>Music</h1>
                            </ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col>
                                <h3>Sfx</h3>
                                <ion-toggle name="sfx"  [(ngModel)]="sfx" (ionChange)="onToggle($event,'sfx')"></ion-toggle>
                            </ion-col>
                            <ion-col>
                                <h3>Music</h3>
                                <ion-toggle name="music" [(ngModel)]="music" (ionChange)="onToggle($event,'music')"></ion-toggle>
                            </ion-col>
                        </ion-row>
                    </form>
                    <ion-row>
                        <ion-col>
                        </ion-col>

                        <ion-col col-8>
                            <button ion-button color="danger" block round (click)="leaveGame()">Leave Game</button>
                        </ion-col>
                        
                        <ion-col>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col>
                        </ion-col>

                        <ion-col col-6>
                            <button ion-button color="gold" block round (click)="closeMenu()">Close</button>
                        </ion-col>
                        
                        <ion-col>
                        </ion-col>
                    </ion-row>        
                </ion-grid>`,
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