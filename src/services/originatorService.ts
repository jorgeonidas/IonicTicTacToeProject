import { Memento } from "../models/memento";

export class OriginatorService{
    //just for test
    private state  = {
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
        unlocks: 0
    }

    memento : Memento;

    constructor(){
        this.memento = new Memento(this.state)
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

    //MUTADORES
    increaseGamesPlayed(difficult: string, gametype: string){
        if(gametype =="singleplayer")
            this.state[difficult].played++;
        else{
            this.state.localMultiplayerPlayed++;
        }
    }



    increaseWins(difficult: string){
        this.state[difficult].win++;
    }

    increaseloses(difficult: string){
        this.state[difficult].lose++;
    }

    updateCristals(cistals:number){
        this.state.cristals += cistals;
    }

    updateEolas(eolas: number){
        this.state.eolas += eolas;
    }

    increaseDoubleReward(){
        this.state.doublingReward++;
    }

    increaseUnlocks(){
        this.state.unlocks++;
    }
}