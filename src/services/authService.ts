import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoadingController, AlertController, Events } from "ionic-angular";
import { ConfigurationServiceDB } from "./configurationdb.service";

@Injectable()
export class AuthService{
    //Dummy data para poblar el api luego se buscara como otener lugar de residencia actual
    paisRes = "Costa Rica";
    timezone= "Costa Rica";
    private _url = 'http://jugadorapi-dev.us-west-2.elasticbeanstalk.com/api/jugadores/';
    private regService = '/register';
    private authService = '/authenticate';
    
    //private _localurl = 'http://localhost:53029/api/jugadores'; //cambiara cada vez que haga pruebas 
    private headers: HttpHeaders;

    //user data
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

    constructor(private http: HttpClient, 
                private loadCtrl: LoadingController,
                private alertCtrl: AlertController,
                private events: Events,
                private db : ConfigurationServiceDB){
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
    /*
    testingApi(){
        let headers = new HttpHeaders({'Content-type' : 'application/json'});

        this.http.get(this._url,{headers: headers}).subscribe(data=>{
            console.log(data);     
        });
    }
    */
    //GET BY ID
    getUserByID(id: number, token: string){
        let headersToken = new HttpHeaders({'Content-type' : 'application/json','Authorization': 'Bearer ' + token});
       /* this.http.get(this._url+id,{headers:headersToken}).subscribe((data)=>{
            console.log("user data",data);
            this.setUserObject(data);
            //ACTUALIZAREMOS LA ULTIMA FECHA DE CONEXION!
            console.log("updating las connection date..");
            this.updateUserData(this.USER_OBJ,token);
        },error=>{console.log(error);}
        );*/
        return this.http.get(this._url+id,{headers:headersToken});
    }

    
    //UPDATE
    updateUserData(userObjc: any, token){
        let headersToken = new HttpHeaders({'Content-type' : 'application/json','Authorization': 'Bearer ' + token});
        this.http.put(this._url + userObjc['id'], userObjc, {headers:headersToken}).subscribe(
            ()=>{
                console.log("ACTUALIZADO CON EXITO!");
            },
            (error)=>{console.log(error);
        })
    }

    updateNickName(nickName: string){
        this.USER_OBJ['nickName'] = nickName;
        this.updateUserData(this.USER_OBJ,this.currentUserToken);
    }

    //DELETE USER (PELIGRO!!!!!)
    deleteUser(id: number, token){
        let headersToken = new HttpHeaders({'Content-type' : 'application/json','Authorization': 'Bearer ' + token});
        this.http.delete(this._url+id,{headers:headersToken}).subscribe(()=>{
            console.log("user deleted succesfully");
        },error=>{
            console.log(error);
        });
    }

    //LOGOUT
    logOut(){
        this.currentUserToken = null;
        for(const prop in this.USER_OBJ){
            this.USER_OBJ[prop] = null;
        }

        this.removeDataSession();
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

        this.USER_OBJ['fecUltimoIngreso'] = currentDate.toISOString().split('.')[0]+" " ;
        this.USER_OBJ['timeZone'] = userObjc['timeZone'];
        this.USER_OBJ['genero'] = userObjc['genero'];

        console.log("AuthService USSER_OBJ:",this.USER_OBJ);
        
    }

    getCurrentToken(){
        return this.currentUserToken;
    }

    getCurrentUserId() : number{
        return this.USER_OBJ['id'];
    }

    getCurrentUserNickname(){
        console.log('nick to provide', this.USER_OBJ['nickName']);       
        return this.USER_OBJ['nickName'];
    }

    //guardando la sesion
    saveLogin() {

        this.db.set('id', this.USER_OBJ.id).then(
            (data) => {
                console.log("saved",data);//
            },
            (error) => {
                console.log(error);
            });
        this.db.set('token', this.currentUserToken).then(
            (data) => {
                console.log("saved",data);
            },
            (error) => {
                console.log(error);
            }
        );

    }
    //recueprar la ultima sesion revisando si el id y el token estan almacenados en la memoria interna
    //de ser asi 
    getSessionData() {
        

        console.log("recuperando sesion");
        this.db.get('token').then((data) => {
            console.log("token", data);
            if (data != null) {
                this.currentUserToken = data;
                console.log(data);

                this.db.get('id').then((data) => {
                    console.log("id",data);
                    const loading = this.loadCtrl.create({ content: 'Please Waint...' });
                    loading.present();
                    if (data != null) {
                        this.USER_OBJ.id = data;
                        //pido y guardo la data del usuario en el servicio para que ya este disponible en el resto del app
                        this.getUserByID(this.getCurrentUserId(), this.getCurrentToken())
                            .subscribe((user_data)=>{ //recupero el usuario por id
                                //actualizo los datos tanto en este service como en el api
                                this.setUserObject(user_data);
                                console.log("updating las connection date..");
                                this.updateUserData(user_data,  this.currentUserToken);
                                
                                let alert = this.alertCtrl.create({
                                    title: 'Succes!',
                                    message: 'Welcome Back '+this.USER_OBJ.nickName+'!',
                                    buttons: [{
                                        text: 'Ok',
                                        role: 'dissmiss'
                                    }]
                                });
                                alert.onDidDismiss(() => {
                                    this.events.publish('authenticate : done');
                                });//testing
                                loading.dismiss();
                                alert.present();
                            },
                            error=>{
                                loading.dismiss();
                                console.log(error);
                            });
                    }

                },
                    (error) => {
                        console.log(error);
                    }
                );
            }
        }, (error) => {
            loading.dismiss();
            console.log(error);
        });
    }

    removeDataSession(){
        this.db.remove('token').then(()=>{
            let alert = this.alertCtrl.create({
                title: 'Succes!',
                message: 'You Just Logged Out!',
                buttons: [{
                    text: 'Ok',
                    role: 'dissmiss'
                }]
            });
            alert.onDidDismiss(() => {
                this.events.publish('logOut : done');
            });//testing
            alert.present();
        },
            (error) =>{
                console.log(error);
                
            }
        );
        this.db.remove('id');
    }

}