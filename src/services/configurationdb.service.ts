import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { IConfig } from '../interfaces/config.interface'
//import { ConfigurationModel } from "../models/configuration";
import { Observable } from 'rxjs/Observable';
import { ConfigurationModel } from "../models/configuration";
import { Storage } from '@ionic/storage';

@Injectable()
export class ConfigurationServiceDB {
  //parametros
  language: string;
  music: boolean;
  sfx: boolean;
  notifications: boolean;
  //para saber si salio o no del juego actual  
  leavingCurrentGame: boolean = false;

  constructor(private storage: Storage) {
  }
  //Base de datos ubicada en www/assests/data/config.json

  public set(settingName, value) {
    return this.storage.set(`setting:${settingName}`, value);
  }
  public async get(settingName) {
    return await this.storage.get(`setting:${settingName}`)
          /*.then((val)=>{
            console.log(val);
            this.currentColor = val; 
          })*/;
  }

  public async remove(settingName) {
    return await this.storage.remove(`setting:${settingName}`);
  }
  public clear() {
    this.storage.clear().then(() => {
      console.log('all keys cleared');
    });
  }

  //reanudar o salir de la partida
  public setLeavingCurrentGame(leaving: boolean) {
    this.leavingCurrentGame = leaving;
  }

  public isLeavingCurrentGame() {
    return this.leavingCurrentGame;
  }
  
  //para evitar problemas de asincronia mejor pidamos los datos ya cargados
  
}