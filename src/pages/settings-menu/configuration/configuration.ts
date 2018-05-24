import { Component, OnInit } from "@angular/core";
import { ViewController, PopoverController, Toggle } from "ionic-angular";
import { SettingsMenuPage } from "../settings-menu";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
    template: `<ion-grid text-center>
                    <ion-row>
                        <ion-col>
                            <h2>Audio</h2>
                        </ion-col>
                    </ion-row>
                    <form [formGroup]="configForm">
                    
                        <ion-row>
                            <ion-col>
                                <ion-row>
                                    <ion-col>
                                        Music
                                    </ion-col>                                
                                </ion-row>
                                <ion-row>
                                    <ion-col>
                                        <ion-toggle 
                                            formControlName="music"
                                            checked="music"
                                            (ionChange)="onToggle($event,'music')">
                                        </ion-toggle>
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
                                        <ion-toggle 
                                        formControlName="sfx" 
                                        checked="sfx"
                                        (ionChange)="onToggle($event,'sfx')"></ion-toggle>
                                    </ion-col>
                                </ion-row>
                            </ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col>
                                <h2>Language</h2>
                                <ion-select formControlName="language" (ionChange)="onSelectChange($event)">
                                <!--OJO ACA!!-->
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
                                <h2>Notifications</h2>
                                <ion-checkbox 
                                formControlName="notifications"
                                (ionChange)="onToggle($event,'notifications')"></ion-checkbox>
                            </ion-col>
                        </ion-row>

                    </form>
                    <ion-row>
                        <ion-col>
                            <button ion-button color="danger" (click)="onClickBack()">Back</button>
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

    configForm: FormGroup;

    constructor(private viewCtrl: ViewController, private popoverCtrl: PopoverController  ){}
    
    ngOnInit(): void {
        this.initializeForm();
    }

    onClickBack(){
        const popover = this.popoverCtrl.create(SettingsMenuPage);
        popover.present();

        this.viewCtrl.dismiss();
    }

    initializeForm(){
        let music = true;
        let sfx = false;
        let language = 'Spanish';
        let notifications = false;

        this.configForm = new FormGroup({
            'music': new FormControl(music, Validators.required),
            'sfx': new FormControl(sfx, Validators.required),
            'language': new FormControl(language, Validators.required),
            'notifications': new FormControl(notifications, Validators.required)
        });
    }

    onToggle(toggle: Toggle, option: string){
        console.log(toggle);
        console.log(option);       
    }

    onSelectChange(selectedValue: any) {
        console.log('Selected', selectedValue);
    }
}