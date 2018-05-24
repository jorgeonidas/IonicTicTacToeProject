import { Component } from "@angular/core";
import { ViewController, PopoverController } from "ionic-angular";
import { SettingsMenuPage } from "../settings-menu";

@Component({
    template: `<ion-grid text-center>
                    <ion-row>
                        <ion-col>
                            <h2>Audio</h2>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col>
                            <ion-row>
                                <ion-col>
                                    Music
                                </ion-col>                                
                            </ion-row>
                            <ion-row>
                                <ion-col>
                                    <ion-toggle checked="true"></ion-toggle>
                                </ion-col>
                            </ion-row>
                        </ion-col>
                        <ion-col>
                            <ion-row>
                                <ion-col>
                                    SFX
                                </ion-col>
                            </ion-row>
                            <ion-row>
                                <ion-col >
                                    <ion-toggle checked="true"></ion-toggle>
                                </ion-col>
                            </ion-row>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col>
                            <h2>Language</h2>
                            <ion-select>
                            <!--OJO ACA!!-->
                                <ion-option
                                    *ngFor="let lang of languages">
                                    {{lang}}
                                </ion-option>
                            </ion-select>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col>
                            <h2>Notifications</h2>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col>
                            <button ion-button color="danger" (click)="onClickBack()">Back</button>
                        </ion-col>
                    </ion-row>
                </ion-grid>`,
})

export class ConfigurationPage{

    languages = ['English','Spanish'];

    constructor(private viewCtrl: ViewController, private popoverCtrl: PopoverController  ){}
    
    onClickBack(){
        const popover = this.popoverCtrl.create(SettingsMenuPage);
        popover.present();

        this.viewCtrl.dismiss();
    }
}