import { HttpClient } from "@angular/common/http";

export class AuthService{
    //Dummy data para poblar el api luego se buscara como otener lugar de residencia actual
    paisRes = 'Costa Rica';
    timezone= 'Costa Rica';
    fechaNac

    private _url = 'http://jugadorapi-dev.us-west-2.elasticbeanstalk.com/api/jugadores'; 
    constructor(private http: HttpClient){}
    
    signup(email: string, nickName: string, password: string, diaNac: number, fechaNac: Date, fechaUi, genero: string){
        return this.http.post(this._url,{
            email: email, 
            nickName: nickName, 
            password: password, 
            fecNacimiento: fechaNac, 
            paisResidencia: this.paisRes,
            fecUltimoIngreso: fechaUi,
            timeZone: this.timezone,
            genero: genero
        });
    }
}