import { Component, OnInit } from "@angular/core";
import { ViewController, PopoverController, Toggle } from "ionic-angular";
import { SettingsMenuPage } from "../settings-menu";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ConfigurationService } from "../../../services/configuration.service";
import { ConfigurationModel } from "../../../models/configuration";
import 'rxjs/Rx';
import { IConfig } from "../../../interfaces/config.interface";
@Component({
    template: `<ion-grid text-center>                   
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
                        <ion-row>
                            <ion-col>
                                <h3>Language</h3>
                            </ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col>
                                <ion-select name="language" [(ngModel)]="currentLang" (ionChange)="onSelectChange($event)">
                                    <ion-option
                                    *ngFor="let language of languages"
                                        [value]="language">
                                        {{language}}
                                    </ion-option>
                                </ion-select>
                            </ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col>
                                <h3>Notifications</h3>
                            </ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col>
                                <ion-checkbox name="notifications" [(ngModel)]="notifications" (ionChange)="onToggle($event,'notifications')"></ion-checkbox>
                            </ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col>
                                <button ion-button color="danger" (click)="onClickBack()">Back</button>
                            </ion-col>
                        </ion-row>                                              
                    </form>    
                </ion-grid>`,
})

export class ConfigurationPage implements OnInit{

    languages = ['English','Spanish'];
    currentLang: string = 'Spanish';
    music: boolean;
    sfx: boolean;
    notifications: boolean;

    configForm: FormGroup;

    public configObj: ConfigurationModel;
    errorMsj: string;
    constructor(private viewCtrl: ViewController, private popoverCtrl: PopoverController, private cfgService: ConfigurationService){}

    ngOnInit(){
        
        console.log('ngOnInit: ');
        //this.cfgService.clear();
        this.cfgService.get('sfx').then((val)=>{
            console.log(val);
            this.sfx = val; 
          });

        this.cfgService.get('music').then((val)=>{
            console.log(val);
            this.music = val; 
        });

        this.cfgService.get('currentLang').then((val)=>{
            console.log(val);
            this.currentLang = val; 
        });

        this.cfgService.get('notifications').then((val)=>{
            console.log(val);
            this.notifications = val; 
        });

        /*this.cfgService.retrieveCfgFromJson()
            .subscribe(data =>{ 
                                this.sfx = data.sfx;
                                console.log(this.sfx);
                                this.music = data.music;
                                console.log(this.music);
                                this.currentLang = data.language;
                                console.log(this.currentLang);
                                this.notifications = data.notifications;
                                console.log(this.notifications);                            
                                }
           );*/
           
    }
    /*
    initializeForm(){
        //console.log("cfgObjInside: ");
        console.log(this.configObj);

        let music = true;
        let sfx = false;
        let language = 'Spanish';
        let notifications = false;

        this.configForm = new FormGroup({
            'music': new FormControl(this.music, Validators.required),
            'sfx': new FormControl(this.sfx, Validators.required),
            'language': new FormControl(this.currentLang, Validators.required),
            'notifications': new FormControl(this.notifications, Validators.required)
        });

        console.log(this.configForm);
        
    }*/

    onToggle(toggle: Toggle, option: string){
        console.log(toggle.value);
        console.log(option);
        /*switch(option){
            case 'music':
                this.music = toggle.value;
                break;
            case 'sfx':
                this.sfx = toggle.value;
                break;
            case 'notifications':
                this.notifications = toggle.value; 
                break;
        }*/
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
        /*this.cfgService.writheCfgToJson(this.currentLang, this.music, this.sfx, this.notifications).subscribe(
            (data)=>{
                    console.log(data);
                },
            error=>{
                console.log(error.error);
                console.log(error.name);
                console.log(error.message);
                console.log(error.status);
            });
        this.viewCtrl.dismiss();*/
    }
}