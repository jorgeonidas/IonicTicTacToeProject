import { Injectable } from "@angular/core";
import { ConfigurationServiceDB } from "../services/configurationdb.service";

@Injectable()
export class ConfigurationModel{

    public language: string; 
    public music: boolean; 
    public sfx: boolean; 
    public notifications: boolean;

    constructor(cfgDb: ConfigurationServiceDB){}

    public setlanguage(lang: string){
        this.language = lang;
    }

    public setMusic(music: boolean){
        this.music = music
    }

    public setSfx(sfx: boolean){
        this.sfx = sfx;
    }

    public setNotif(notifications: boolean){
        this.notifications = notifications
    }

}