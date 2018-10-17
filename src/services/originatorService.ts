import { Memento } from "../models/memento";
/**
 * El originator se encarga de cerar y mutar el 
 * estado actual de la aplicacion
 */
export class OriginatorService{
    //just for test
    private state = {
        daysInRow : 0,
        easy: {
            played : 0,
            win: 0,
            lose: 0,
        },
        medium: {
            played : 0,
            win: 0,
            lose: 0,
        },
        hard: {
            played : 0,
            win: 0,
            lose: 0,
        },
        localMultiplayerPlayed: 0,
        cristals : 0,
        eolas: 0,
        doublingReward : 0,
        unlocks: 0,
    }

    memento : Memento;

    constructor(){
        console.log("executing originator Constructor");
        
        this.memento = new Memento(this.state);
    }

    getState(){
        return this.state;
    }

    saveStateToMemento(){
        this.memento.setState(this.state);
    }

    getStateFromMemento(){
        return this.state = this.memento.getState();
    }
    //retorno memento
    getMemento() : Memento{
        return this.memento;
    }

    //MUTADORES
    increaseGamesPlayed(difficult: string, gametype: string){
        if(gametype =="singleplayer")
            this.state[difficult].played++;
        else{
            this.state.localMultiplayerPlayed++;
        }
        this.saveStateToMemento();
    }



    increaseWins(difficult: string){
        this.state[difficult].win++;
        this.saveStateToMemento();
    }

    increaseloses(difficult: string){
        this.state[difficult].lose++;
        this.saveStateToMemento();
    }

    updateCristals(cistals:number){
        this.state.cristals += cistals;
        this.saveStateToMemento();
    }

    updateEolas(eolas: number){
        this.state.eolas += eolas;
        this.saveStateToMemento();
    }

    increaseDoubleReward(){
        this.state.doublingReward++;
        this.saveStateToMemento();
    }

    increaseUnlocks(){
        this.state.unlocks++;
        this.saveStateToMemento();
    }
}