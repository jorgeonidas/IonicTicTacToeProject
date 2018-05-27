import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import {IConfig} from '../interfaces/config.interface'
//import { ConfigurationModel } from "../models/configuration";
import { Observable } from 'rxjs/Observable';
import { ConfigurationModel } from "../models/configuration";
import { Storage } from '@ionic/storage';

@Injectable()
export class ConfigurationService{

    constructor(private storage: Storage){}


    public set(settingName,value){
        return this.storage.set(`setting:${ settingName }`,value);
      }
      public async get(settingName){
        return await this.storage.get(`setting:${ settingName }`)
          /*.then((val)=>{
            console.log(val);
            this.currentColor = val; 
          })*/;
      }
    
      public async remove(settingName){
        return await this.storage.remove(`setting:${ settingName }`);
      }
      public clear() {
        this.storage.clear().then(() => {
          console.log('all keys cleared');
        });
      }
    //private localUrl: string ="assets/data/config.json";

   
    /*
    retrieveCfgFromJson() : Observable<IConfig> {
       return this.http.get<ConfigurationModel>(this.localUrl)
    }

    writheCfgToJson(language: string, music: boolean, sfx: boolean, notifications: boolean){
        console.log(music+" "+sfx+" "+language+" "+notifications);
        let cfg =  new ConfigurationModel(language, music, sfx, notifications);
        console.log(cfg);
        
        return this.http.put(this.localUrl,cfg);
    }*/
}