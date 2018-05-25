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
                        <h3>Sfx</h3>
                        <ion-toggle name="sfx"  [(ngModel)]="sfx"></ion-toggle>
                        <ion-toggle name="music" [(ngModel)]="music"></ion-toggle>
                        <ion-select name="language" [(ngModel)]="currentLang"  >
                            <!--OJO ACA!!-->
                            <ion-option
                               *ngFor="let language of languages"
                                [value]="language">
                                {{language}}
                            </ion-option>
                        </ion-select>
                        <ion-checkbox name="notifications" [(ngModel)]="notifications"></ion-checkbox>
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

        this.cfgService.retrieveCfgFromJson()
            .subscribe(data =>{ //console.log(data);
                                //this.configObj = data;                            
                                //console.log(this.configObj);                                
                                //this.initializeForm();
                                this.sfx = data.sfx;
                                console.log(this.sfx);
                                this.music = data.music;
                                console.log(this.music);
                                this.currentLang = data.language;
                                console.log(this.currentLang);
                                this.notifications = data.notifications;
                                console.log(this.notifications);
                                
                                }
           );
           
    }
    
    initializeForm(){
        //console.log("cfgObjInside: ");
        console.log(this.configObj);

        /*let music = true;
        let sfx = false;
        let language = 'Spanish';
        let notifications = false;*/

        this.configForm = new FormGroup({
            'music': new FormControl(this.music, Validators.required),
            'sfx': new FormControl(this.sfx, Validators.required),
            'language': new FormControl(this.currentLang, Validators.required),
            'notifications': new FormControl(this.notifications, Validators.required)
        });

        console.log(this.configForm);
        
    }
    
    onClickBack(){
        const popover = this.popoverCtrl.create(SettingsMenuPage);
        popover.present();

        this.viewCtrl.dismiss();
    }

    onToggle(toggle: Toggle, option: string){
        console.log(toggle);
        console.log(option);       
    }

    onSelectChange(selectedValue: any) {
        console.log('Selected', selectedValue);
    }
}