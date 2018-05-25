import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import {IConfig} from '../interfaces/config.interface'
//import { ConfigurationModel } from "../models/configuration";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ConfigurationService{
   /* music: boolean = false;
    sfx: boolean= false;
    language: string = 'English';
    notifications: boolean = true;*/
    //errorMessage: string;

    //config: IConfig;
    errormsj: any;

    constructor(private http: HttpClient){}

    private localUrl: string ="assets/data/config.json";

   

    retrieveCfgFromJson() : Observable<IConfig> {
       return this.http.get<IConfig>(this.localUrl)
    }
    /*getConfigurations(){
        this.retrieveCfgFromJson();
        return this.config;
    }*/
}