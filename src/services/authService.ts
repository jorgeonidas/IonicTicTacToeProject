import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthService{
    //Dummy data para poblar el api luego se buscara como otener lugar de residencia actual
    paisRes = "Costa Rica";
    timezone= "Costa Rica";
    private _url = 'http://jugadorapi-dev.us-west-2.elasticbeanstalk.com/api/jugadores/';
    //private _localurl = 'http://localhost:53029/api/jugadores'; //cambiara cada vez que haga pruebas 
    
    constructor(private http: HttpClient){}
    
    signup(email: string, nickName: string, password: string, fechaNac: string, fechaUi:string, genero: string){

        let headers = new HttpHeaders({'Content-type' : 'application/json'});

        return this.http.post(this._url+"/register", JSON.stringify({
            email: email, 
            nickName: nickName, 
            password: password, 
            fecNacimiento: fechaNac, 
            paisResidencia: this.paisRes,
            fecUltimoIngreso: fechaUi,
            timeZone: this.timezone,
            genero: genero
        }),
    {headers: headers});
    }
    //hago un get para probar el api
    testingApi(){
        let headers = new HttpHeaders({'Content-type' : 'application/json'});

        this.http.get(this._url,{headers: headers}).subscribe(data=>{
            console.log(data);     
        });
    }
}