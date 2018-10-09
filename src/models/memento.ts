export class Memento{
    //EL MEMENTO LUEGO SERA UNA BD
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
        doublingReward : 0,
        unlocks: 0
    }

    constructor(state: any){
        this.state = state;
    }

    getState(){
        return this.state;
    }

    setState(state:any){
        this.state = state;
    }
}