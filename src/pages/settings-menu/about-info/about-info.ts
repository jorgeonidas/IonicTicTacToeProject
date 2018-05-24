import { Component } from "@angular/core";
import { ViewController, PopoverController } from "ionic-angular";
import { SettingsMenuPage } from "../settings-menu";

@Component({
    template: `<ion-grid text-center>
                    <ion-row>
                        <ion-col>ACA VA LA IMAGEN DE VR</ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col>
                            <button ion-button block (click)="onClickAbout('support')">Support</button>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col>
                            <button ion-button color="danger" (click)="onClickAbout('back')">Back</button>
                        </ion-col>
                    </ion-row>
                </ion-grid>`,
})

export class AboutInfoPage{

    constructor(private viewCtrl: ViewController, private popoverCtrl: PopoverController  ){}

    onClickAbout(info: string){
        if(info == 'back'){
            const popover = this.popoverCtrl.create(SettingsMenuPage);
            popover.present();

            this.viewCtrl.dismiss();
        }
    }
}