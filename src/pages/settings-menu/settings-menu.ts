import { Component } from "@angular/core";
import { ViewController, PopoverController } from "ionic-angular";
import { ImportantInfoPage } from "./importatn-info/important-info";
import { AboutInfoPage } from "./about-info/about-info";
import { ConfigurationPage } from "./configuration/configuration";

@Component({    
    template: `<ion-grid text-center>
                    <ion-row>
                        <ion-col>
                            <h1>SETTINGS</h1>
                        </ion-col> 
                    </ion-row>
                    <ion-row>
                        <ion-col>
                            <button ion-button block (click)="onOption('option')">Options</button>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col>
                            <button ion-button block (click)="onOption('about')">About this App</button>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col>
                            <button ion-button block (click)="onOption('important')">Inportatn information</button>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col>
                            <button ion-button color="danger" (click)="onOption('close')">Close</button>
                        </ion-col>
                    </ion-row>
                </ion-grid>`,
                selector: 'settings-menu'
})

export class SettingsMenuPage{
    constructor(private viewCtrl: ViewController, private popoverCtrl: PopoverController){}

    onOption(option: string){
        if(option == 'close'){
            this.viewCtrl.dismiss();
        }
        if(option == 'important'){
            const popover = this.popoverCtrl.create(ImportantInfoPage);
            popover.present();
            this.viewCtrl.dismiss();
        }
        if(option == 'about'){
            const popover = this.popoverCtrl.create(AboutInfoPage);
            popover.present();
            this.viewCtrl.dismiss();
        }
        if(option == 'option'){
            const popover = this.popoverCtrl.create(ConfigurationPage);
            popover.present();
            this.viewCtrl.dismiss();
        }
    }
}