import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthService{
    //Dummy data para poblar el api luego se buscara como otener lugar de residencia actual
    paisRes = "Costa Rica";
    timezone= "Costa Rica";
    private _url = 'http://jugadorapi-dev.us-west-2.elasticbeanstalk.com/api/jugadores/';
    private regService = '/register';
    private authService = '/authenticate';
    private authToken : string;
    
    //private _localurl = 'http://localhost:53029/api/jugadores'; //cambiara cada vez que haga pruebas 
    private headers: HttpHeaders;

    //user data
    private currUserId: number;
    private currentUserNickName: string;
    private currentUserEmail: string;
    private currentUserToken: string;
    
    private USER_OBJ ={
        "id": null,
        "email": null,
        "nickName": null,
        //"password": null,
        "fecNacimiento": null,
        "paisResidencia": null,
        "fecUltimoIngreso": null,
        "timeZone": null,
        "genero": null
    }

    constructor(private http: HttpClient){
        this.headers = new HttpHeaders({'Content-type' : 'application/json'});
    }
    
    //create
    signup(email: string, nickName: string, password: string, fechaNac: string, fechaUi:string, genero: string){

        //let headers = new HttpHeaders({'Content-type' : 'application/json'});

        return this.http.post(this._url + this.regService, JSON.stringify({
            email: email, 
            nickName: nickName, 
            password: password, 
            fecNacimiento: fechaNac, 
            paisResidencia: this.paisRes,
            fecUltimoIngreso: fechaUi,
            timeZone: this.timezone,
            genero: genero
        }),
    {headers: this.headers});
    }

    //login
    signin(nickname:string, password: string){
        
        return this.http.post(this._url + this.authService,JSON.stringify({
            nickName: nickname,
            password: password
        }),
        {headers: this.headers});
        
    }

    //hago un get para probar el api
    testingApi(){
        let headers = new HttpHeaders({'Content-type' : 'application/json'});

        this.http.get(this._url,{headers: headers}).subscribe(data=>{
            console.log(data);     
        });
    }

    //GET BY ID
    getUserByID(id: number, token: string){
        let headersToken = new HttpHeaders({'Content-type' : 'application/json','Authorization': 'Bearer ' + token});
        this.http.get(this._url+id,{headers:headersToken}).subscribe((data)=>{
            console.log("user data",data);
            this.setUserObject(data);
            //this.setCurrentUserNickname(data['nickName']);
        },error=>{console.log(error);}
        );
    }

    //ACTUALIZAR


    //LOGOUT
    logOut(){
        this.currUserId = null;
        this.currentUserNickName = null;
        this.currentUserEmail = null
        this.currentUserToken = null;
    }
    //setters
    setUserLoginData(id:number, nickName: string, userEmail: string, token: string){
 
        this.USER_OBJ['id'] = id;
        this.USER_OBJ['nickName'] = nickName
        this.USER_OBJ['email'] = userEmail;
        this.currentUserToken = token;

    }

    setUserObject(userObjc: any){
        this.USER_OBJ['id'] = userObjc['id'];
        this.USER_OBJ['email'] = userObjc['email'];
        this.USER_OBJ['nickName'] = userObjc['nickName'];
        //this.USER_OBJ['password'] = userObjc['password'];
        this.USER_OBJ['fecNacimiento'] = userObjc['fecNacimiento'];
        this.USER_OBJ['paisResidencia'] = userObjc['paisResidencia'];

        //ultimo dia de conexion
        let currentDate = new Date();
        //console.log(currentDate.toISOString().split('.')[0]+" " );

        this.USER_OBJ['fecUltimoIngreso'] = currentDate.toISOString().split('.')[0]+" " ;
        this.USER_OBJ['timeZone'] = userObjc['timeZone'];
        this.USER_OBJ['genero'] = userObjc['genero'];

        console.log("AuthService USSER_OBJ:",this.USER_OBJ);
        
    }

    //UPDATE


    /*
    setCurrentUserNickname(nickname : string){
        this.currentUserNickName = nickname;
    }*/
    //getters
    getCurrentToken(){
        return this.currentUserToken;
    }

    getCurrentUserNickname(){
        return this.USER_OBJ['nickName'];
    }

}