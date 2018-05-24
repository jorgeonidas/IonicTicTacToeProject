import { Component } from "@angular/core";
import { ViewController, PopoverController } from "ionic-angular";
import { SettingsMenuPage } from "../settings-menu";

@Component({
    template: `<ion-grid text-center>
                    <ion-row>
                        <ion-col>
                            <button ion-button block> Official Website </button>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col>
                            <button ion-button block> Privacy Policy </button>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col>
                            <button ion-button block> User Agreement </button>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col>
                            <button ion-button block> Health and Safety Information </button>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col>
                            <button ion-button color="danger" (click)="onClickInfo('back')"> Back </button>
                        </ion-col>
                    </ion-row>
                </ion-grid>`,
})
export class ImportantInfoPage{
    
    constructor(private viewCtrl: ViewController, private popoverCtrl: PopoverController){}

    onClickInfo(info: string){
        if(info=='back'){
            const popover = this.popoverCtrl.create(SettingsMenuPage);
            popover.present();

            this.viewCtrl.dismiss();
            
        }
    }
}